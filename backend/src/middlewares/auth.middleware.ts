import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { JwtWrapper } from "../utils/jwt-wrapper";
import { Constants } from "../constants";
import { Messages } from "../utils/messages";

export const verifyJWT = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies("accessToken") || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.AUTH.TOKEN_MISSING)
        }

        const secretKey = String(Constants.JWT_SECRET_KEY);
        const decode = JwtWrapper.verify(token, secretKey);
        if(typeof decode !== 'object' || !decode){
            throw new ApiError(HttpStatusCodes.UNAUTHORIZED, Messages.AUTH.TOKEN_INVALID)
        }
        const {id, role} = decode as {id: string, role: string};
        req.user = {id, role}

        next()
    } catch (error) {
        next(error)
    }
} 