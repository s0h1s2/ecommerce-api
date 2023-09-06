import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import { ZodIssue, ZodSchema } from "zod";

export function validator(schema: ZodSchema) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            schema.parse(req.body)
            next()
            return
        } catch (err: any) {
            const errors: Record<string, string> = {}
            err.issues.forEach((issue: ZodIssue) => {
                const key = issue.path[0].toString()
                errors[key] = issue.message;
            })
            res.status(StatusCodes.BAD_REQUEST).json({ error: errors })
            return
        }
    }
}