"use client"

import React from 'react'
import { useFormState } from 'react-dom'
import signup, { ISignupFormState } from '../server/auth/signup'

import {
  Card,
	CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormButton from './FormButton'
import Link from 'next/link'

const initialState: ISignupFormState = {
  error: {}
}

const SignupForm: React.FC = () => {
  const [state, action] = useFormState(signup, initialState);

  return (
    <Card className="mx-auto w-80">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
				<CardDescription className="text-center">Create your account to use FinTrack!</CardDescription>
      </CardHeader>

      <CardContent>
      <form action={action}>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2 mb-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John"
                required
              />
              {state.error.name && (
                <p className="text-red-500 text-sm">
                  {state.error.name}
                </p>
              )}
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder=""
                required
              />
              {state.error.password && (
                <p className="text-red-500 text-sm">
                  {state.error.password}
                </p>
              )}
            </div>

            <FormButton label='Create Account' />
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}

          <Link href="/login">Login</Link>
				</div>
      </CardContent>
    </Card>
  )
}

export default SignupForm