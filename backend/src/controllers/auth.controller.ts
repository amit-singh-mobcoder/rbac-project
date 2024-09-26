import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { ApiResponse } from "../utils/api.response";
import { Messages } from "../utils/messages";

export default class AuthController {
    _authService: AuthService;

    constructor(authService: AuthService){
        this._authService = authService;
    }

    async registerUser(req: Request, res: Response, next: NextFunction){
        try {
            const { username, password, roles } = req.body;
            const user = await this._authService.registerUser({username, password, roles})

            return res.status(HttpStatusCodes.CREATED).json(new ApiResponse(HttpStatusCodes.OK, user, Messages.USER.USER_CREATED))
            
        } catch (error) {
            next(error)
        }
    }
}