import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { getUserById } from "@/lib/auth"
import { getBMIHistory } from "@/app/actions/bmi"
import { BMICalculator } from "@/components/bmi-calculator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, Calendar, Target } from "lucide-react"

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect("/login")

  const user = await getUserById(session.userId)
  if (!user) redirect("/login")

  const bmiHistory = await getBMIHistory()
  const latestBMI = bmiHistory?.[0]

  return (
    <div className="container mx-auto px-6 py-10 md:px-10 lg:px-16 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back{user?.name ? `, ${user.name}` : ""}!</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Stay on track with your health. Monitor your BMI and see your progress in one place.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-600">Latest BMI</CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{latestBMI?.bmi ?? "N/A"}</div>
            <p className="text-sm text-gray-500">{latestBMI?.category ?? "No records yet"}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-600">Total Records</CardTitle>
            <Calendar className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{bmiHistory?.length ?? 0}</div>
            <p className="text-sm text-gray-500">BMI calculations saved</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-600">Health Goal</CardTitle>
            <Target className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">18.5 - 24.9</div>
            <p className="text-sm text-gray-500">Normal BMI range</p>
          </CardContent>
        </Card>
      </div>
      

      {/* BMI Calculator + History */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BMICalculator />

        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent BMI Records</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Your last 5 BMI calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bmiHistory && bmiHistory.length > 0 ? (
              <div className="space-y-3">
                {bmiHistory.slice(0, 5).map((record) => (
                  <div
                    key={record.id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-md border"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">BMI: {record.bmi}</div>
                      <div className="text-xs text-gray-500">{record.category}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(record.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No BMI records yet. Calculate your first BMI!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
