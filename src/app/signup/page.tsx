import React from "react";
import { signup } from "@/server/auth";

export default async function Page() {
	return (
		<>
			<h1>Create an account</h1>
			<form action={signup}>
        <label htmlFor="name">Name</label>
				<input name="name" id="name" />
				<br />

        <label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" />
				<br />

				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>

        <a href="https://google.com">Click here to goole</a>
			</form>
		</>
	);
}