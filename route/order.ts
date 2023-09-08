import { Router } from "express";
import { getOrders } from "../controller/order";
import { isAdmin, isAuth } from "../middleware/accessControl";

const router = Router()
router.get("/", isAuth, isAdmin, getOrders)
export default router;
