export interface Consultation {
  id: number
  subject: string
  message: string
  status: string
  createdAt: Date
}

export interface BMIRecord {
  id: number
  weight: number
  height: number
  bmi: number
  category: string
  createdAt: Date
}

export interface User {
  id: number
  email: string
  name: string
}
