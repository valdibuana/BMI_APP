"use server"

import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"

export async function submitConsultation(formData: FormData) {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Not authenticated" }
    }

    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!subject || !message) {
      return { error: "Subject and message are required" }
    }

    if (subject.length < 3) {
      return { error: "Subject must be at least 3 characters long" }
    }

    if (message.length < 10) {
      return { error: "Message must be at least 10 characters long" }
    }

    await prisma.consultation.create({
      data: {
        userId: session.userId,
        subject: subject.trim(),
        message: message.trim(),
      },
    })

    revalidatePath("/consultation")
    return { success: true }
  } catch (error) {
    console.error("Consultation submission error:", error)
    return { error: "Failed to submit consultation. Please try again." }
  }
}

export async function getConsultations() {
  try {
    const session = await getSession()
    if (!session) {
      return []
    }

    const consultations = await prisma.consultation.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
      },
    })

    return consultations
  } catch (error) {
    console.error("Get consultations error:", error)
    return []
  }
}
