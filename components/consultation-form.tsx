"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitConsultation } from "@/app/actions/consultation"
import { MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage("")

    try {
      const result = await submitConsultation(formData)

      if (result?.error) {
        setMessage(result.error)
      } else if (result?.success) {
        setMessage("Consultation submitted successfully!")
        const form = document.getElementById("consultation-form") as HTMLFormElement
        form?.reset()
      }
    } catch {
      setMessage("Failed to submit consultation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Consultation Form</h2>
              <p className="text-slate-200 text-sm">Get expert advice on your health journey</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form id="consultation-form" action={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="subject" className="text-base font-semibold text-slate-700 flex items-center gap-2">
              Subject
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="e.g., BMI interpretation, Diet advice, Exercise recommendations"
              required
              className="h-12 rounded-xl border-slate-300 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="message" className="text-base font-semibold text-slate-700 flex items-center gap-2">
              Message
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe your question or concern in detail. Include relevant information such as your current BMI, health goals, or specific areas you'd like guidance on..."
              rows={6}
              required
              className="rounded-xl border-slate-300 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 text-slate-700 placeholder:text-slate-400 resize-none"
            />
            <p className="text-xs text-slate-500">The more details you provide, the better we can assist you.</p>
          </div>

          {message && (
            <Alert
              variant={message.includes("successfully") ? "default" : "destructive"}
              className={`rounded-xl border-0 ${
                message.includes("successfully")
                  ? "bg-green-50 text-green-800 shadow-green-100"
                  : "bg-red-50 text-red-800 shadow-red-100"
              } shadow-lg`}
            >
              <div className="flex items-center gap-2">
                {message.includes("successfully") ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <AlertDescription className="font-medium">{message}</AlertDescription>
              </div>
            </Alert>
          )}

          <Button
            type="submit"
            className={`w-full h-12 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
              isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900"
            } text-white border-0`}
            disabled={isSubmitting}
          >
            <div className="flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Consultation
                </>
              )}
            </div>
          </Button>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Our health experts will review your consultation and respond within 24-48 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
