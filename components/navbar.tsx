import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, History, MessageSquare, LogOut, Menu } from "lucide-react"
import { signout } from "@/app/actions/auth"
import { getSession } from "@/lib/session"
import { getUserById } from "@/lib/auth"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export async function Navbar() {
  const session = await getSession()
  const user = session ? await getUserById(session.userId) : null

  return (
    <nav className="sticky top-0 z-50 border-b border-sky-300 bg-sky-200 shadow-lg h-16">
      <div className="container flex h-full items-center justify-between px-4 md:px-6">
        {/* Brand */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center space-x-3 text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors"
        >
          <div className="p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-md">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
            BMI Tracker
          </span>
        </Link>

        {/* Navigation Links */}
        {user && (
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 px-4 py-2 rounded-lg"
            >
              Dashboard
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 px-4 py-2 rounded-lg"
            >
              <History className="h-4 w-4" />
              History
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 px-4 py-2 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              Consultation
            </Link>
          </div>
        )}

        {/* User Actions + Mobile Menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Avatar dan Nama */}
              <div className="hidden md:flex items-center gap-3 bg-slate-50 rounded-full px-3 py-2 border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold uppercase shadow-md ring-2 ring-white">
                  {user.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-medium text-slate-700">Hi, {user.name}</span>
              </div>
              <form action={signout}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 shadow-md hover:shadow-lg transition-all duration-200 border-0"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-6 bg-white">
                <div className="space-y-6">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-white flex items-center justify-center font-semibold uppercase shadow-md ring-2 ring-white">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Welcome back</p>
                          <p className="text-base font-semibold text-slate-800">{user.name}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link
                          href="/dashboard"
                          prefetch={false}
                          className="block text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 px-3 py-2 rounded-lg"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/history"
                          prefetch={false}
                          className="block flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 px-3 py-2 rounded-lg"
                        >
                          <History className="h-4 w-4" />
                          History
                        </Link>
                        <Link
                          href="/consultation"
                          prefetch={false}
                          className="block flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 px-3 py-2 rounded-lg"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Consultation
                        </Link>
                      </div>
                      <form action={signout} className="pt-2 border-t border-slate-200">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </Button>
                      </form>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/login" prefetch={false}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register" prefetch={false}>
                        <Button className="w-full justify-start bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 shadow-md">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
