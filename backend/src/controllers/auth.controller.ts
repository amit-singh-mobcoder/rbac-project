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
            const user = await this._authService.registerUser(req.body);
            return res.status(HttpStatusCodes.CREATED).json(new ApiResponse(HttpStatusCodes.OK, user, Messages.USER.USER_CREATED))   
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const response = await this._authService.login(req.body)
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, response , Messages.AUTH.LOGIN_SUCCESS))
        } catch (error) {
            next(error)
        }
    }
}