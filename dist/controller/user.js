"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = exports.userAuthentication = void 0;
const db_1 = __importDefault(require("../config/db"));
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../util/jwt");
function userAuthentication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield db_1.default.user.findUnique({ where: { email: email } });
        if (user == null) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials." });
        }
        const hashResult = yield bcrypt_1.default.compare(password, user.password);
        if (!hashResult) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials." });
        }
        // TODO:turn http-only option
        res.cookie("jwt", (0, jwt_1.generateToken)({ id: user.id, isAdmin: user.isAdmin }), { path: "/" });
        return res.json({ id: user === null || user === void 0 ? void 0 : user.id, name: user === null || user === void 0 ? void 0 : user.name });
    });
}
exports.userAuthentication = userAuthentication;
function userRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // check for email
        const { email, name, password } = req.body;
        const result = yield db_1.default.user.findUnique({ where: { email: email } });
        if (result) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: "Provided email exist.Try another email" });
        }
        // save user in database
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isAdmin: false
            }
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).send({});
    });
}
exports.userRegister = userRegister;
