import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { getConsultations } from "@/app/actions/consultation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConsultationForm } from "@/components/consultation-form"
export const dynamic = 'force-dynamic';

export default async function ConsultationPage() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const consultations = await getConsultations()

  function getStatusVariant(status: string): "default" | "secondary" | "outline" {
    switch (status) {
      case "pending":
        return "secondary"
      case "in_progress":
        return "default"
      case "completed":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Health Consultation</h1>
        <p className="text-muted-foreground">Get professional advice about your health and BMI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit New Consultation</CardTitle>
            <CardDescription>Ask our health professionals about your BMI, diet, or exercise concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <ConsultationForm/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Consultations</CardTitle>
            <CardDescription>Track your consultation requests and responses</CardDescription>
          </CardHeader>
          <CardContent>
            {consultations && consultations.length > 0 ? (
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <div key={consultation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{consultation.subject}</h4>
                      <Badge variant={getStatusVariant(consultation.status)}>{consultation.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{consultation.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted:{" "}
                      {new Date(consultation.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No consultations yet</p>
                <p className="text-sm text-muted-foreground">
                  Submit your first consultation to get professional health advice
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Maintaining Healthy BMI:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Eat a balanced diet with fruits and vegetables</li>
                <li>• Exercise regularly (150 minutes per week)</li>
                <li>• Stay hydrated with plenty of water</li>
                <li>• Get adequate sleep (7-9 hours per night)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">When to Consult:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• BMI outside normal range (18.5-24.9)</li>
                <li>• Rapid weight changes</li>
                <li>• Questions about diet or exercise</li>
                <li>• Health concerns related to weight</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
