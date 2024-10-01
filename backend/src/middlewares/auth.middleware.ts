import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";
import { JwtWrapper } from "../utils/jwt-wrapper";
import { Constants } from "../constants";
import { IRole } from "../models/role.model";

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization")
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.AUTH.TOKEN_MISSING)
    }
    const token = authHeader.replace('Bearer ', "");

    const secretKey = Constants.JWT_SECRET_KEY;
    const decode = JwtWrapper.verify(token, secretKey);
    console.log(decode)

    if (typeof decode !== "object" || !decode) {
      throw new ApiError(
        HttpStatusCodes.UNAUTHORIZED,
        Messages.AUTH.TOKEN_INVALID
      );
    }

    let { id, roleId } = decode as { id: string; roleId: string };
    roleId = roleId.toString();
    req.user = { id, roleId };

    next();
  } catch (error) {
    next(error);
  }
};
