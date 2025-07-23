"use server"

import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"

function calculateBMI(weight: number, height: number) {
  const bmi = weight / (height * height)
  let category = ""

  if (bmi < 18.5) {
    category = "Underweight"
  } else if (bmi < 25) {
    category = "Normal weight"
  } else if (bmi < 30) {
    category = "Overweight"
  } else {
    category = "Obese"
  }

  return { bmi: Math.round(bmi * 100) / 100, category }
}

export async function saveBMIRecord(formData: FormData) {
  const session = await getSession()
  if (!session) {
    return { error: "Not authenticated" }
  }

  const weight = Number.parseFloat(formData.get("weight") as string)
  const height = Number.parseFloat(formData.get("height") as string) / 100 // Convert cm to m
  const gender = formData.get("gender") as string // Get gender from form data

  if (!weight || !height || !gender) {
    // Validate gender presence
    return { error: "Weight, height, and gender are required" }
  }

  const { bmi, category } = calculateBMI(weight, height)

  try {
    await prisma.bmiRecord.create({
      data: {
        userId: session.userId,
        weight,
        height,
        bmi,
        category,
        gender, // Save gender
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/history")

    return { success: true, bmi, category }
  } catch (error) {
    console.error("Failed to save BMI record:", error)
    return { error: "Failed to save BMI record" }
  }
}

export async function getBMIHistory() {
  const session = await getSession()
  if (!session) {
    return []
  }

  try {
    const records = await prisma.bmiRecord.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        weight: true,
        height: true,
        bmi: true,
        category: true,
        gender: true, // Include gender in history
        createdAt: true,
      },
    })

    return records
  } catch (error) {
    console.error("Failed to get BMI history:", error)
    return []
  }
}
