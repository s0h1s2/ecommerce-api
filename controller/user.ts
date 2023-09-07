import { Request, Response } from "express"
import { AuthBody } from "../validation/authSchema"
import db from "../config/db"
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import { generateToken } from "../util/jwt";
import { CreateUser } from "../validation/createUserSchema";
export async function userAuthentication(req: Request, res: Response) {
    const { email, password }: AuthBody = req.body
    const user=await db.user.findUnique({where:{email:email}});
    if (user==null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({error:"Invalid credentials."})
    }
    const hashResult=await bcrypt.compare(password,user.password)
    if(!hashResult){
      return res.status(StatusCodes.UNAUTHORIZED).json({error:"Invalid credentials."})
    }
   // TODO:turn http-only option
    res.cookie("jwt",generateToken({id:user.id,isAdmin:user.isAdmin}),{path:"/"})
    return res.json({id:user?.id,name:user?.name})
} 
export async function userRegister(req:Request,res:Response){
  // check for email
  const {email,name,password}:CreateUser=req.body
  const result=await db.user.findUnique({where:{email:email}})
  if(result){
    return res.status(StatusCodes.BAD_REQUEST).send({error:{email:"Provided email exist.Try another email"}})
  } 
  // save user in database
  const hashedPassword=await bcrypt.hash(password,10)
  await db.user.create({
    data:{
      name,
      email,
      password:hashedPassword,
      isAdmin:false
    }
  })
  return res.status(StatusCodes.CREATED).send({})
}
