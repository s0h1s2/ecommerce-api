import { Request, Response } from "express";
import { CreateOrder } from "../validation/createOrderSchema";
import db from "../config/db";
import { StatusCodes } from "http-status-codes";

export function getOrders(req: Request, res: Response) {
  return res.send({ foo: "bar" })
}
export function getUserOrders(req: Request, res: Response) {
  return res.send({ foo: "bar" })
}
export function getOrderById(req: Request, res: Response) {
  return res.send({ foo: "bar" })
}

export async function createOrder(req: Request, res: Response) {
  const { orderItems, address, city, country, postalCode }: CreateOrder = req.body
  // TODO: make sure product stock after qty doesn't remain under 0
  try {
    const products = await Promise.all(orderItems.map(async (product, index) => {
      const result = await db.product.findFirstOrThrow({ where: { id: product.productId } })
      if (result.stock - product.qty <= 0) {
        throw new Error("Product stock unavaliable.")
      }
      return { id: result.id, qty: product.qty, price: result.price }
    }))
    const totalPrice = products.reduce((p, c) => c.price * c.qty + p, 0)
    // TODO: maybe using transaction a better idea
    const orderResult = await db.order.create({
      data: {
        totalPrice: totalPrice * 10,
        address,
        city,
        country,
        postalCode,
        itemsPrice: totalPrice,
        orderItems: {
          create: products.map((p) => ({ qty: p.qty }))
        },
        shippingPrice: totalPrice,
        taxPrice: 1,
        isPaid: false,
        userId: req.user.id,
        deliveredTime: new Date()
      }
    })
    // TODO: may update stock then send web socket request to client to update items stock 
    products.map(async (p) => {
      await db.product.update({ where: { id: p.id }, data: { stock: { decrement: p.qty } } })
    })
    return res.status(StatusCodes.CREATED).send({ order: orderResult })
  } catch (e: any) {
    return res.status(StatusCodes.NOT_FOUND).send({ error: e.message })
  }
}
export function updateOrderToPaid(req: Request, res: Response) {
  return res.send({ foo: "bar" })
}
export function updateOrderToDelivered(req: Request, res: Response) {
  return res.send({ foo: "bar" })
}

