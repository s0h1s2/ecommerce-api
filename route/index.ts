import { Router } from "express";
import userRouter from "./user"
import productRouter from "./product"
const router = Router()
router.use("/users",userRouter)
router.use("/products",productRouter)
export default router
