import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { getUserById } from "@/lib/auth"
import { getBMIHistory } from "@/app/actions/bmi"
import { BMICalculator } from "@/components/bmi-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Target, Activity, Clock, User } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect("/login")

  const user = await getUserById(session.userId)
  if (!user) redirect("/login")

  const bmiHistory = await getBMIHistory()
  const latestBMI = bmiHistory?.[0]

  function getBadgeColor(category: string) {
    switch (category) {
      case "Underweight":
        return "bg-blue-50 text-blue-700 border border-blue-200"
      case "Normal weight":
        return "bg-green-50 text-green-700 border border-green-200"
      case "Overweight":
        return "bg-amber-50 text-amber-700 border border-amber-200"
      case "Obese":
        return "bg-red-50 text-red-700 border border-red-200"
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-10 md:px-10 lg:px-16">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent mb-2">
                Welcome back{user?.name ? `, ${user.name}` : ""}!
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                Stay on track with your health. Monitor your BMI and see your progress in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700">Latest BMI</CardTitle>
                <div className="p-2 bg-blue-500 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-slate-800 mb-1">{latestBMI?.bmi ?? "N/A"}</div>
              <p className="text-sm text-slate-600">{latestBMI?.category ?? "No records yet"}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700">Total Records</CardTitle>
                <div className="p-2 bg-green-500 rounded-lg">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-slate-800 mb-1">{bmiHistory?.length ?? 0}</div>
              <p className="text-sm text-slate-600">BMI calculations saved</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-700">Health Goal</CardTitle>
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Target className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-slate-800 mb-1">18.5 - 24.9</div>
              <p className="text-sm text-slate-600">Normal BMI range</p>
            </CardContent>
          </Card>
        </div>

        {/* BMI Calculator + History */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <BMICalculator />
          </div>

          <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-600 rounded-lg">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-slate-800">Recent BMI Records</CardTitle>
                  <CardDescription className="text-sm text-slate-600">Your last 5 BMI calculations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {bmiHistory && bmiHistory.length > 0 ? (
                <div className="space-y-4">
                  {bmiHistory.slice(0, 5).map((record, index) => (
                    <div
                      key={record.id}
                      className="flex justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-lg">BMI: {record.bmi}</div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(record.category)}`}
                          >
                            {record.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-700">
                          {new Date(record.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(record.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium mb-2">No BMI records yet</p>
                  <p className="text-sm text-slate-500">Calculate your first BMI to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
