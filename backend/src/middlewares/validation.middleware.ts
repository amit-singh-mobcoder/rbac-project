import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if( error ) {
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, error.details[0].message)
        }

        next()
    }
}