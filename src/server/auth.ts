"use server";

import { ActionResult } from "next/dist/server/app-render/types";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { z } from "zod";

import { lucia } from "../lib/auth"
import db from "../db";
import { users } from "../db/schema";
import { eq, or } from "drizzle-orm";

const userSchema = z.object({
  name: z.string().min(1).max(256),
  email: z.string().email(),

  // username must be between 4 ~ 31 characters,
  // and only consists of lowercase letters, 0-9, -, and _
  username: z.string().min(4).max(31).regex(/^[a-z0-9_-]+$/),

  // password must be between 6 ~ 255 characters
  password: z.string().min(6).max(255),
});

export async function signup(formData: FormData): Promise<ActionResult> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // validate the form data
  const parsedForm = userSchema.safeParse(formValues);
  if (!parsedForm.success) {
    return {
      error: "Invalid form data",
      details: parsedForm.error.errors
    };
  }

  const {
    name,
    username,
    password,
    email
  } = parsedForm.data;

	const passwordHash = await hash(parsedForm.data.password, {
    // The amount of memory to be used by the hash function, in kilobytes
		memoryCost: 19456,

    // The amount of passes (iterations) used by the hash function.
    // It increases hash strength at the cost of time required to compute.
		timeCost: 2,

    // The hash length is the length of the hash function output in bytes
		outputLen: 32,

    // The amount of threads to compute the hash on.
    // Each thread has a memory pool with memoryCost size
		parallelism: 1
	});

	const userId = generateIdFromEntropySize(10); // 16 characters long

  // check if email OR username is already used
  const user = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.email, email),
        eq(users.username, username)
      )
    )

  // username or email is already used
  if (user.length > 0) {
    return {
      error: "Username or email is already used",
    };
  }

  // store the user in the database
  await db.insert(users).values({
    id: userId,
    name,
    email,
    username,
    password: passwordHash
  });

	const session = await lucia.createSession(userId, {});

	const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}