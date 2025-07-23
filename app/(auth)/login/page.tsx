"use client"

import Link from "next/link"
import { AuthForm } from "@/components/auth-form"
import { motion } from "framer-motion"


export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to access your health dashboard</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AuthForm mode="signin" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-gray-600"
        >
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-sky-600 hover:underline font-medium">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </main>
  )
}
