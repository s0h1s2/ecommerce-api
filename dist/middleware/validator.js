"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const http_status_codes_1 = require("http-status-codes");
function validator(schema) {
    return function (req, res, next) {
        try {
            schema.parse(req.body);
            next();
            return;
        }
        catch (err) {
            const errors = {};
            err.issues.forEach((issue) => {
                const key = issue.path[0].toString();
                errors[key] = issue.message;
            });
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: errors });
            return;
        }
    };
}
exports.validator = validator;
