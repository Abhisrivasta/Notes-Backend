import { User } from "../models/user.model"

export async function getCurrentUser(clerkId: string) {

  if (!clerkId) {
    throw new Error("User not authenticated")
  }

  let user = await User.findOne({ clerkId })

  if (!user) {
    user = await User.create({
      clerkId
    })
  }

  return user
}