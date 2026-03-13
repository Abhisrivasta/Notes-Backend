import { Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string

  isActive?: boolean
  isPremium?: boolean
  notesCount?: number

  premiumExpiresAt?: Date

  role: "user" | "guest"
}