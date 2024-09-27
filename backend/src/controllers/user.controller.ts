import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { ApiResponse } from "../utils/api.response";
import { Messages } from "../utils/messages";

export default class UserController {
  _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.user;
      const { id } = data as { id: string };
      const user = await this._userService.getProfile(id);
      return res
        .status(HttpStatusCodes.OK)
        .json(
          new ApiResponse(HttpStatusCodes.OK, user, Messages.USER.USER_FETCHED)
        );
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction){
    try {
      await this._userService.deleteUser(req.params.id)
      return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, {}, ` user: ${req.params.id}, ${Messages.USER.USER_DELETED}`))
    } catch (error) {
      next(error)
    }
  }
}
