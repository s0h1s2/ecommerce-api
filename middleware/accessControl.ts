import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../util/jwt";
import { StatusCodes } from "http-status-codes";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  return res.status(StatusCodes.UNAUTHORIZED).send({ error: "Resource is not authorized." })
}
export function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies["jwt"];
  if (token == null) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: "Json web token cookie wasn't set." })
  }
  const user = decodeToken(token)
  if (user == null) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: "Expire or invalid token." })
  }
  req.user = user
  next()

}

