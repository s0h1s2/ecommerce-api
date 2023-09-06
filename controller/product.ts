import { Request, Response } from "express";
import db from "../config/db";

export async function getProducts(req:Request,res:Response){
  // TODO: implmenet paginaiton 
  const products=await db.product.findMany();
  return res.json(products)
}
export async function getProductById(req:Request<{id:number}>,res:Response){
  const {id}=req.params
  const productId=parseInt(id.toString() ,10)
  const products=await db.product.findUnique({where:{id:productId}});
  return res.json(products)
}

