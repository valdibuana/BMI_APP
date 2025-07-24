import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { getBMIHistory } from "@/app/actions/bmi"
import { History, TrendingUp, Calendar, Weight, Ruler, Activity } from "lucide-react"

export const dynamic = "force-dynamic"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function HistoryPage() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const bmiHistory = await getBMIHistory()

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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-lg">
              <History className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                BMI History
              </h1>
              <p className="text-slate-600 mt-1">Track your BMI changes over time</p>
            </div>
          </div>

          {/* Stats Cards */}
          {bmiHistory && bmiHistory.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Records</p>
                    <p className="text-xl font-bold text-slate-800">{bmiHistory.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Latest BMI</p>
                    <p className="text-xl font-bold text-slate-800">{bmiHistory[0]?.bmi}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">First Record</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {new Date(bmiHistory[bmiHistory.length - 1]?.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Card */}
        <Card className="bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              All BMI Records
            </CardTitle>
            <CardDescription className="text-slate-600">
              Complete history of your BMI calculations ({bmiHistory?.length ?? 0} records)
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {bmiHistory && bmiHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 border-b border-slate-200 hover:bg-slate-50">
                      <TableHead className="text-left text-sm font-semibold text-slate-700 py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date
                        </div>
                      </TableHead>
                      <TableHead className="text-left text-sm font-semibold text-slate-700 py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Weight className="h-4 w-4" />
                          Weight (kg)
                        </div>
                      </TableHead>
                      <TableHead className="text-left text-sm font-semibold text-slate-700 py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4" />
                          Height (m)
                        </div>
                      </TableHead>
                      <TableHead className="text-left text-sm font-semibold text-slate-700 py-4 px-6">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          BMI
                        </div>
                      </TableHead>
                      <TableHead className="text-left text-sm font-semibold text-slate-700 py-4 px-6">
                        Category
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bmiHistory.map((record, index) => (
                      <TableRow
                        key={record.id}
                        className={`hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-25"
                        }`}
                      >
                        <TableCell className="py-4 px-6 text-sm text-slate-700">
                          <div className="font-medium">
                            {new Date(record.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
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
                        </TableCell>
                        <TableCell className="py-4 px-6 text-sm font-medium text-slate-800">{record.weight}</TableCell>
                        <TableCell className="py-4 px-6 text-sm font-medium text-slate-800">{record.height}</TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="text-lg font-bold text-slate-900">{record.bmi}</div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <span
                            className={`text-xs font-semibold px-3 py-2 rounded-full ${getBadgeColor(record.category)}`}
                          >
                            {record.category}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16 px-6">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <History className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No BMI Records Found</h3>
                  <p className="text-slate-600 mb-4">
                    Start tracking your BMI by using the calculator on your dashboard.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 text-left">
                    <p className="text-sm text-slate-600">
                      <strong>Tip:</strong> Regular BMI tracking helps you monitor your health progress over time.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
