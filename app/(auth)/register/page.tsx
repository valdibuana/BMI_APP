import Link from "next/link"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { getSession } from "@/lib/session"
import { UserPlus, ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function RegisterPage() {
  const session = await getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-transparent"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-12">

        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
              <p className="text-slate-200 text-sm">Join us and start tracking your health today</p>
            </div>

            {/* Form Section */}
            <div className="px-8 py-8">
              <AuthForm mode="signup" />
            </div>

            {/* Footer Section */}
            <div className="px-8 pb-8">
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Already have an account?</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 group"
                  >
                    Sign in to your account
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-slate-700 hover:text-slate-900 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-slate-700 hover:text-slate-900 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
