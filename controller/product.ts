import { Request, Response } from "express";
import db from "../config/db";
import { StatusCodes } from "http-status-codes";

export async function getProducts(req: Request, res: Response) {
  // TODO: implmenet paginaiton 
  const products = await db.product.findMany();
  return res.json(products)
}
export async function getProductById(req: Request<{ id: number }>, res: Response) {
  // what is this in god's name.
  const { id } = req.params
  const productId = parseInt(id.toString(), 10)
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).send({ error: "Product wasn't found." })
  }
  return res.json(product)
}

