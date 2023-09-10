import { Router } from "express";
import { createOrder, getOrderById, getOrders, getUserOrders, updateOrderToDelivered, updateOrderToPaid } from "../controller/order";
import { isAdmin, isAuth } from "../middleware/accessControl";
import { validator } from "../middleware/validator";
import { createOrderSchema } from "../validation/createOrderSchema";

const router = Router()
router.get("/", isAuth, isAdmin, getOrders)
router.get("/user", isAuth, getUserOrders)
router.get("/:id", isAuth, getOrderById)
router.post("/", isAuth, validator(createOrderSchema), createOrder)
router.put("/:id/pay", isAuth, isAdmin, updateOrderToPaid)
router.put("/:id/deliver", isAuth, isAdmin, updateOrderToDelivered)
export default router;
