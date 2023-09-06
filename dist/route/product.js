"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controller/product");
const router = (0, express_1.Router)();
router.get("/", product_1.getProducts);
router.get("/:id(\\d+)/", product_1.getProductById);
exports.default = router;
