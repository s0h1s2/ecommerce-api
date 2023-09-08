import { Request, Response } from "express";

export function getOrders(req: Request, res: Response) {
  return res.send({ foo: "bar" })
}
