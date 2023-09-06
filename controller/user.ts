import { Request, Response } from "express"
import { AuthBody } from "../validation/authSchema"
import db from "../config/db"
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import { generateToken } from "../util/jwt";
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
  res.status(StatusCodes.CREATED).send({})
}
