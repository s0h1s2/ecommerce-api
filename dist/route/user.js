"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const validator_1 = require("../middleware/validator");
const authSchema_1 = require("../validation/authSchema");
const router = (0, express_1.Router)();
router.post("/auth", (0, validator_1.validator)(authSchema_1.authSchema), user_1.userAuthentication);
exports.default = router;
