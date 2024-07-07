"use client"

import React from 'react'
import { useFormState } from 'react-dom'
import login, { ILoginFormState } from '../server/auth/login'
import FormButton from "@/components/FormButton"

const initialState: ILoginFormState = {
	error: {}
}

const LoginForm: React.FC = () => {
  const [state, action] = useFormState(login, initialState);

	return (
		<div className="w-96 p-4 bg-zinc-300 rounded-md">
			<h1 className="text-3xl mb-4">Log in</h1>

			<form action={action}>
				<div className="flex flex-col mb-2">
					<label htmlFor="email" className="font-bold">
						email
					</label>
					<input type="email" name="email" id="email" />
					{state.error.email && (
						<p className="text-red-500">
							{state.error.email}
						</p>
					)}
				</div>
				
				<div className="flex flex-col mb-2">
					<label htmlFor="password" className="font-bold">
						Password
					</label>
					<input type="password" name="password" id="password" />
					{state.error.password && (
						<p className="text-red-500">
							{state.error.password}
						</p>
					)}
				</div>

				<FormButton label="Log in" />
			</form>
		</div>
	);
}

export default LoginForm