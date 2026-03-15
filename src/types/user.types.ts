import { Document } from "mongoose"

export interface IUser extends Document {
  clerkId: string
  isPremium?: boolean
  premiumExpiresAt?: Date
  role: "user" | "guest"
}