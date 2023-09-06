"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// TODO: change origin when deploy
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use("/api", route_1.default);
/*app.get('/', async function (req: Request, res: Response) {
    const users = await db.user.findMany({})
    console.log(users)
    return res.json({ "name": "Hell,Yeah" })
}*/
app.listen(port, () => {
    console.log(`[Server] Server listening on port ${port}`);
});
