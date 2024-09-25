import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";
import { ApiResponse } from "../utils/api.response";

export default class UserController {

    _userService: UserService;

    constructor(userService: UserService){
        this._userService = userService;
    }

    async helloAdmin(req: Request, res: Response, next: NextFunction){
        try {
            const admin = await this._userService.helloAdmin();
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, admin, Messages.USER.USER_FETCHED));
        } catch (error) {
            next(error)
        }
    }

    async helloManager(req: Request, res:Response, next:NextFunction){
        try {
            const manager = await this._userService.helloManager();
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, manager, Messages.USER.USER_FETCHED));
        } catch (error) {
            next(error)
        }
    }
    async helloUser(req: Request, res:Response, next:NextFunction){
        try {
            const user = await this._userService.helloUsers();
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, user, Messages.USER.USER_FETCHED));
        } catch (error) {
            next(error)
        }
    }
}