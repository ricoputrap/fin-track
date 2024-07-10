import React from "react";
import SignupForm from "@/components/SignupForm";

export default async function Page() {

	// * if you uncomment this line, the error page will be shown
	// * and the signup form will not be shown
	// * the error page is defined in `/src/app/signup/error.tsx`
	// throw new Error("HAHAHA");

	return (
		<main className="flex justify-center items-center h-screen">
			<SignupForm />
		</main>
	);
}