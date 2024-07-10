"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import validateRequest from "../../lib/validate-request"
import lucia from "../../lib/auth";

export default async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}