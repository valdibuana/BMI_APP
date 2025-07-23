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
    <nav className="sticky top-0 z-50 border-b border-sky-300 bg-sky-200 shadow-sm h-16">
      <div className="container flex h-full items-center justify-between px-4 md:px-6">
        {/* Brand */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2 text-xl font-bold text-sky-800">
          <Calculator className="h-6 w-6" />
          <span>BMI Tracker</span>
        </Link>

        {/* Navigation Links */}
        {user && (
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-sky-800 hover:text-sky-900 hover:bg-sky-300/50 transition-colors px-3 py-1 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-1 text-sm font-medium text-sky-800 hover:text-sky-900 hover:bg-sky-300/50 transition-colors px-3 py-1 rounded-md"
            >
              <History className="h-4 w-4" />
              History
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-1 text-sm font-medium text-sky-800 hover:text-sky-900 hover:bg-sky-300/50 transition-colors px-3 py-1 rounded-md"
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
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-semibold uppercase shadow">
                  {user.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm text-sky-800">Hi, {user.name}</span>
              </div>
              <form action={signout}>
                <Button variant="ghost" size="sm" className="hidden md:flex text-sky-800 hover:bg-sky-300">
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-sky-800 hover:bg-sky-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button size="sm" className="bg-sky-800 text-white hover:bg-sky-900">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-sky-800 hover:bg-sky-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] p-5">
                <div className="space-y-4">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 border-b pb-2">
                        <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-semibold uppercase shadow">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <span className="text-base font-semibold text-sky-800">Hi, {user.name}</span>
                      </div>
                      <Link href="/dashboard" prefetch={false} className="block text-sm hover:text-sky-900">
                        Dashboard
                      </Link>
                      <Link href="/history" prefetch={false} className="block flex items-center gap-2 text-sm hover:text-sky-900">
                        <History className="h-4 w-4" />
                        History
                      </Link>
                      <Link href="/consultation" prefetch={false} className="block flex items-center gap-2 text-sm hover:text-sky-900">
                        <MessageSquare className="h-4 w-4" />
                        Consultation
                      </Link>
                      <form action={signout}>
                        <Button variant="ghost" className="w-full justify-start mt-2">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </form>
                    </>
                  ) : (
                    <>
                      <Link href="/login" prefetch={false}>
                        <Button variant="ghost" className="w-full justify-start">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register" prefetch={false}>
                        <Button className="w-full justify-start">Sign Up</Button>
                      </Link>
                    </>
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
