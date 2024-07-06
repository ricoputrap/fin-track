"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { z } from "zod";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Defines the schema for the login form.
 */
const loginFormSchema = z.object({
  username: z.string().min(4).max(31).regex(/^[a-z0-9_-]+$/),
  password: z.string().min(6).max(255),
});

/**
 * Logs in a user with the provided form data. Validates the form data, checks if the username exists,
 * verifies the password, creates a session, sets a session cookie, and redirects to the home page.
 *
 * @param {FormData} formData - The form data containing the username and password.
 * @return {Promise<{error?: string, details?: any} | void>} - If the login is unsuccessful, returns an object with an error message.
 * If successful, creates a session, sets a session cookie, and redirects to the home page.
 */
export async function login(formData: FormData) {

  const formValues = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // validate the form data
  const parsedForm = loginFormSchema.safeParse(formValues);
  if (!parsedForm.success) {
    return {
      error: "Invalid login data",
      details: parsedForm.error.errors
    };
  }

  const { username, password } = parsedForm.data;

	const existingUser = await db
    .select()
    .from(users)
    .where(
      eq(users.username, username.toLowerCase())
    );

	if (!existingUser.length) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Incorrect username or password"
		};
	}

  const user = existingUser[0];

	const validPassword = await verify(user.password, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	if (!validPassword) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}