"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signup, signin, type FormState } from "@/app/actions/auth"
export const dynamic = 'force-dynamic';

interface AuthFormProps {
  mode: "signin" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  // Wrap signup and signin to match the useActionState signature: (prevState, formData) => Promise<State>
  const actionFunction =
    mode === "signup"
      ? async (prevState: FormState, formData: FormData) => signup(formData)
      : async (prevState: FormState, formData: FormData) => signin(formData)

  const [state, formAction, pending] = useActionState<FormState, FormData>(
    actionFunction, // Use the wrapped action function here
    { error: "" }, // Initial state for the action result
  )

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === "signup" ? "Create Account" : "Sign In"}</CardTitle>
        <CardDescription>
          {mode === "signup"
            ? "Enter your information to create an account"
            : "Enter your credentials to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Loading..." : mode === "signup" ? "Create Account" : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
