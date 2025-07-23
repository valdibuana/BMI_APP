// Additional type definitions for better type safety
export interface User {
  id: number
  email: string
  name: string
}

export interface BMIRecord {
  id: number
  weight: number
  height: number
  bmi: number
  category: string
  createdAt: Date
}

export interface Session {
  userId: number
}
