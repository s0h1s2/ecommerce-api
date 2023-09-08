import jwt from "jsonwebtoken"
import { UserRequest } from "../interfaces/UserRequest"
// TODO:load secret from .env JWT_SECRET 
const secret = "shhh"
export function generateToken(obj: Record<string, any>) {
  const token = jwt.sign(obj, secret)
  return token
}
export function decodeToken(token: string): UserRequest | null {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded as UserRequest
  } catch (e) {
    return null
  }
}
