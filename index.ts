import express, { Express } from "express"
import router from "./route"
import cors from "cors"
const app: Express = express()
const port = 3000
app.use(express.json())
// TODO: change origin when deploy
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api", router)
/*app.get('/', async function (req: Request, res: Response) {
	const users = await db.user.findMany({})
	console.log(users)
	return res.json({ "name": "Hell,Yeah" })
}*/

app.listen(port, () => {
	console.log(`[Server] Server listening on port ${port}`)
})
