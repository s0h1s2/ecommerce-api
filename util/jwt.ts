import jwt from "jsonwebtoken"
export function generateToken(obj:Record<string,any>){
  const token=jwt.sign(obj,"shhhh")
  return token
}
