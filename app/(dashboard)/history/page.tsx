import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { getBMIHistory } from "@/app/actions/bmi"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function HistoryPage() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const bmiHistory = await getBMIHistory()

  function getBadgeColor(category: string) {
    switch (category) {
      case "Underweight":
        return "bg-blue-100 text-blue-800"
      case "Normal weight":
        return "bg-green-100 text-green-800"
      case "Overweight":
        return "bg-yellow-100 text-yellow-800"
      case "Obese":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-6 py-10 md:px-10 lg:px-16 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">BMI History</h1>
        <p className="text-gray-600">Track your BMI changes over time</p>
      </div>

      <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-800">All BMI Records</CardTitle>
          <CardDescription className="text-gray-500">
            Complete history of your BMI calculations ({bmiHistory?.length ?? 0} records)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bmiHistory && bmiHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-left text-sm font-semibold text-gray-600">
                      Date
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-gray-600">
                      Weight (kg)
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-gray-600">
                      Height (m)
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-gray-600">
                      BMI
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-gray-600">
                      Category
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100">
                  {bmiHistory.map((record) => (
                    <TableRow
                      key={record.id}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                      <TableCell className="py-3 text-sm text-gray-700">
                        {new Date(record.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-gray-700">
                        {record.weight}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-gray-700">
                        {record.height}
                      </TableCell>
                      <TableCell className="py-3 font-semibold text-gray-800">
                        {record.bmi}
                      </TableCell>
                      <TableCell className="py-3">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${getBadgeColor(
                            record.category
                          )}`}
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
            <div className="text-center py-10">
              <p className="text-gray-600 mb-2">No BMI records found</p>
              <p className="text-sm text-gray-500">
                Start tracking your BMI by using the calculator on your dashboard.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
