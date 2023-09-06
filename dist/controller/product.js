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
exports.getProductById = exports.getProducts = void 0;
const db_1 = __importDefault(require("../config/db"));
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield db_1.default.product.findMany();
        return res.json(products);
    });
}
exports.getProducts = getProducts;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const productId = parseInt(id.toString(), 10);
        const products = yield db_1.default.product.findUnique({ where: { id: productId } });
        return res.json(products);
    });
}
exports.getProductById = getProductById;
