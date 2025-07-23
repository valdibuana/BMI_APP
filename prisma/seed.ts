import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seed...")

  // Create demo users
  const hashedPassword = await bcrypt.hash("password123", 12)

  const user1 = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      passwordHash: hashedPassword,
      name: "Demo User",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      passwordHash: hashedPassword,
      name: "John Doe",
    },
  })

  // Create sample BMI records
  await prisma.bmiRecord.createMany({
    data: [
      {
        userId: user1.id,
        weight: 70.5,
        height: 1.75,
        bmi: 23.02,
        category: "Normal weight",
        gender: "male", // Added gender
      },
      {
        userId: user1.id,
        weight: 72.0,
        height: 1.75,
        bmi: 23.51,
        category: "Normal weight",
        gender: "male", // Added gender
      },
      {
        userId: user2.id,
        weight: 85.0,
        height: 1.8,
        bmi: 26.23,
        category: "Overweight",
        gender: "female", // Added gender
      },
    ],
  })

  // Create sample consultations
  await prisma.consultation.createMany({
    data: [
      {
        userId: user1.id,
        subject: "BMI Interpretation",
        message: "I would like to understand what my BMI results mean for my health.",
        status: "pending",
      },
      {
        userId: user2.id,
        subject: "Weight Loss Advice",
        message: "My BMI shows I am overweight. What steps should I take to reach a healthy weight?",
        status: "pending",
      },
    ],
  })

  console.log("✅ Seed completed successfully!")
  console.log(`👤 Created users: ${user1.name}, ${user2.name}`)
  console.log("📊 Created sample BMI records and consultations")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
