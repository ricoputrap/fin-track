"use server";

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { z } from "zod";
import { eq, or } from "drizzle-orm";

import lucia from "@/lib/auth"
import db from "@/db";
import { users } from "@/db/schema";

export interface ISignupFormState {
  error: {
    name?: string
    email?: string
    password?: string
  }
}

/**
 * Defines the schema for the signup form.
 */
const signupFormSchema = z.object({
  name: z.string().min(1).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

/**
 * Signs up a user with the provided form data. Validates the form data, checks if the email or username is already used,
 * and stores the user in the database. Creates a session for the user and sets a session cookie. Redirects to the home page.
 *
 * @param {FormData} formData - The form data containing the user's name, email, and password.
 * @return {Promise<{error?: string, details?: any} | void>} - If the form data is invalid, returns an object with an error message and details.
 * If the email or username is already used, returns an object with an error message. If successful, redirects to the home page.
 */
export default async function signup(prevState: ISignupFormState, formData: FormData) {
  // Simulate a slow network request (to show loading state)
	await new Promise((resolve) => setTimeout(resolve, 1000));

  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // validate the form data
  const parsedForm = signupFormSchema.safeParse(formValues);
  if (!parsedForm.success) {
    const { name, email, password } = parsedForm.error.flatten().fieldErrors;
    return {
      error: {
        name: name?.[0],
        email: email?.[0],
        password: password?.[0]
      }
    };
  }

  const { name, password, email } = parsedForm.data;

	const passwordHash = await hash(password, {
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

  // check if email is already used
  const user = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.email, email)
      )
    )

  // email is already used
  if (user.length > 0) {
    return {
      error: {
        email: "Email is already used"
      },
    };
  }

  // store the user in the database
  await db.insert(users).values({
    id: userId,
    name,
    email,
    password: passwordHash
  });

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	redirect("/");
}