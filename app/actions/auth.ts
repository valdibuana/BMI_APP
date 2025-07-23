"use server"

import { redirect } from "next/navigation"
import { createUser, getUserByEmail, verifyPassword } from "@/lib/auth"
import { createSession, deleteSession } from "@/lib/session"

export interface FormState {
  error?: string
  success?: boolean
}

export async function signup(formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  try {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return { error: "User already exists" }
    }

    const user = await createUser(email, password, name)
    await createSession(user.id)

    redirect("/dashboard")
    return { success: true }
  } catch (e: unknown) {
    // Changed 'any' to 'unknown'
    // Check if the error is a Next.js redirect error
    if (
      e &&
      typeof e === "object" &&
      "digest" in e &&
      typeof (e as { digest: string }).digest === "string" && // Ensure digest is a string
      (e as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw e // Re-throw the redirect error so Next.js can handle it
    }
    console.error("Signup error:", e)
    return { error: "Failed to create account" }
  }
}

export async function signin(formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return { error: "Invalid credentials" }
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return { error: "Invalid credentials" }
    }

    await createSession(user.id)
    redirect("/dashboard")
    return { success: true }
  } catch (e: unknown) {
    // Changed 'any' to 'unknown'
    // Check if the error is a Next.js redirect error
    if (
      e &&
      typeof e === "object" &&
      "digest" in e &&
      typeof (e as { digest: string }).digest === "string" && // Ensure digest is a string
      (e as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw e // Re-throw the redirect error so Next.js can handle it
    }
    console.error("Signin error:", e)
    return { error: "Failed to sign in" }
  }
}

export async function signout() {
  await deleteSession()
  redirect("/login")
}
