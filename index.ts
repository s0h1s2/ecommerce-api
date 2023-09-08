import express, { Express } from "express"
import router from "./route"
import cors from "cors"
import cookieParser from "cookie-parser"
import { UserRequest } from "./interfaces/UserRequest"
declare global {
	namespace Express {
		interface Request {
			user: UserRequest
		}
	}
}
const app: Express = express()
const port = 3000
app.use(express.json())
app.use(cookieParser())
// TODO: change origin when deploy
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use("/api", router)
app.listen(port, () => {
	console.log(`[Server] Server listening on port ${port}`)
})
