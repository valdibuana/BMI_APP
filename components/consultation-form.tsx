"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitConsultation } from "@/app/actions/consultation"

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
    <form
      id="consultation-form"
      action={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-white/70 backdrop-blur rounded-xl border border-gray-300 shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Consultation Form</h2>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-base font-medium text-gray-700">
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          placeholder="e.g., BMI interpretation, Diet advice"
          required
          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-base font-medium text-gray-700">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Describe your question or concern in detail..."
          rows={6}
          required
          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {message && (
        <Alert
          variant={message.includes("successfully") ? "default" : "destructive"}
          className={
            message.includes("successfully")
              ? "bg-green-100 text-green-800 border-green-400"
              : "border-red-400"
          }
        >
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Consultation"}
      </Button>
    </form>
  )
}
