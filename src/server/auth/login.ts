"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import lucia from "@/lib/auth";
import { z } from "zod";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface ILoginFormState {
	error: {
		email?: string
		password?: string
	}
}

/**
 * Defines the schema for the login form.
 */
const loginFormSchema = z.object({
	email: z.string().email(),
  password: z.string().min(6).max(255),
});

/**
 * Logs in a user with the provided form data. Validates the form data, checks if the username exists,
 * verifies the password, creates a session, sets a session cookie, and redirects to the home page.
 *
 * @param {ILoginFormState} prevState - The previous state of the login form.
 * @param {FormData} formData - The form data containing the username and password.
 * @return {Promise<ILoginFormState | void>} - If the login is unsuccessful, returns an object with an error message.
 * If successful, creates a session, sets a session cookie, and redirects to the home page.
 */
export default async function login(prevState: ILoginFormState, formData: FormData) {

	// Simulate a slow network request (to show loading state)
	await new Promise((resolve) => setTimeout(resolve, 1000));

  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // validate the form data
  const parsedForm = loginFormSchema.safeParse(formValues);
  if (!parsedForm.success) {
		const { email, password } = parsedForm.error.flatten().fieldErrors;
		return {
			error: {
				email: email?.[0],
				password: password?.[0]
			}
		}
  }

  const { email, password } = parsedForm.data;

	const existingUser = await db
    .select()
    .from(users)
    .where(
      eq(users.email, email.toLowerCase())
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
			error: {
				username: "Incorrect username"
			}
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
			error: {
				password: "Incorrect password"
			}
		};
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	redirect("/");
}