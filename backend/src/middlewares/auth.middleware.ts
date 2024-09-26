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
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        Messages.AUTH.TOKEN_MISSING
      );
    }

    const secretKey = Constants.JWT_SECRET_KEY;
    const decode = JwtWrapper.verify(token, secretKey);

    if (typeof decode !== "object" || !decode) {
      throw new ApiError(
        HttpStatusCodes.UNAUTHORIZED,
        Messages.AUTH.TOKEN_INVALID
      );
    }

    const { id, roleId } = decode as { id: string; roleId: IRole };
    req.user = { id, roleId };

    next();
  } catch (error) {
    next(error);
  }
};
