import { Router } from "express";
import userRouter from "./user"
import productRouter from "./product"
import orderRouter from "./order"

const router = Router()
router.use("/users", userRouter)
router.use("/products", productRouter)
router.use("/orders", orderRouter)
export default router
