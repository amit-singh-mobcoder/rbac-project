import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/api.response";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";

export default class AuthController {
    _authService: AuthService;

    constructor(authService: AuthService){
        this._authService = authService;
    }

    async registerUser(req: Request, res: Response, next: NextFunction){
        try {
            const requestBody = {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            }

            const newUser = await this._authService.registerUser({ requestBody });
            return res.status(HttpStatusCodes.CREATED).json(new ApiResponse(HttpStatusCodes.OK, newUser, Messages.USER.USER_CREATED))  
            
        } catch (error) {
            next(error)
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction){
        try {
            const requestBody = {
                username: req.body.username,
                password: req.body.password
            }

            const response = await this._authService.loginUser({requestBody});
            const {token, user} = response;
            const cookieOptions = {
                httpOnly: true,
                maxAge: 5 * 60 * 1000,
                secure: false,
            }
            return res.status(HttpStatusCodes.OK).cookie("accessToken", token, cookieOptions).json(new ApiResponse(HttpStatusCodes.OK, token, `${user.username}, ${Messages.AUTH.LOGIN_SUCCESS}`))
        } catch (error) {
            next(error)
        }
    }
}