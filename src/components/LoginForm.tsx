"use client"

import React from 'react'
import { useFormState } from 'react-dom'
import Link from "next/link"
import login, { ILoginFormState } from '../server/auth/login'
import FormButton from "@/components/FormButton"

import {
  Card,
	CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState: ILoginFormState = {
	error: {}
}

const LoginForm: React.FC = () => {
  const [state, action] = useFormState(login, initialState);

	return (
		<Card className="mx-auto w-80">
			<CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
				<CardDescription className="text-center">Please login to use FinTrack!</CardDescription>
      </CardHeader>

			<CardContent>
				<form action={action}>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2 mb-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="john@gmail.com"
								required
							/>
							{state.error.email && (
								<p className="text-red-500 text-sm">
									{state.error.email}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2 mb-2">
							<Label htmlFor="email">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								required
							/>
							{state.error.password && (
								<p className="text-red-500 text-sm">
									{state.error.password}
								</p>
							)}
						</div>

						<FormButton label='Log in' />
					</div>
				</form>

				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}

export default LoginForm