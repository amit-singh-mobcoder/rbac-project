import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { RoleModel } from "../models/role.model";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";

export const checkPermission = (requiredPermission: string) => {

    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.user;
            const { id } = data as {id: string};
            const activeUser = await UserModel.findById(id);
            
            // const roleId = activeUser?.role.toString();
            // const role = await RoleModel.findById(roleId);
            // const rolePermissions = role?.permissions;
            
            // let hasPermission;
            // if(Array.isArray(rolePermissions)){
            //     hasPermission = rolePermissions?.some(permission => permission.name === requiredPermission)
            // }
            // if(!hasPermission){
            //     throw new ApiError(HttpStatusCodes.FORBIDDEN, Messages.PERMISSION.ACCESS_DENIED);
            // }

            const userPermissions = activeUser?.permissions;
            let hasPermission;
            if(Array.isArray(userPermissions)){
                hasPermission = userPermissions.find((permission) => permission === requiredPermission)
            }
            if(!hasPermission){
                throw new ApiError(HttpStatusCodes.FORBIDDEN, Messages.PERMISSION.ACCESS_DENIED);
            }

            next();
        } catch (error) {
            next(error)
        }
    }
}