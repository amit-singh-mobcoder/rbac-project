import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { ApiResponse } from "../utils/api.response";
import { Messages } from "../utils/messages";
import RoleService from "../services/role.service";

export default class UserController {
  _userService: UserService;
  _roleService: RoleService;

  constructor(userService: UserService, roleService: RoleService) {
    this._userService = userService;
    this._roleService = roleService;
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

  async userRole(req: Request, res: Response, next: NextFunction){
    try {
      const data = req.user;
      const { roleId } = data as { roleId: string };

      const role = await this._roleService.getRole(roleId);
      return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, role, Messages.USER.ROLE_FETECHED))
    } catch (error) {
      next(error)
    }
  }
}
