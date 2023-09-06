import { Router } from "express";
import { userAuthentication,userRegister} from "../controller/user";
import { validator } from "../middleware/validator";
import { authSchema } from "../validation/authSchema";
import { createUserSchema } from "../validation/createUserSchema";
const router=Router()
router.post("/auth",validator(authSchema),userAuthentication)
router.post("/",validator(createUserSchema),userRegister)
export default router
