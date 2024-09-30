import RoleService from "../services/role.service";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { ApiResponse } from "../utils/api.response";
import { Messages } from "../utils/messages";

export default class RoleController {
    _roleService: RoleService;

    constructor(roleService: RoleService){
        this._roleService = roleService;
    }

    async newRole(req: Request, res: Response, next: NextFunction) {
        try {
            const {role, permissions} = req.body;
            const newRole = await this._roleService.newRole({role, permissions});
            return res.status(HttpStatusCodes.CREATED).json(new ApiResponse(HttpStatusCodes.OK, newRole, Messages.ROLE.CREATED))
        } catch (error) {
            next(error)
        }
    }

    async addPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const { permissions } = req.body;
            const id = req.params.id;
            const updatedRole = await this._roleService.addPermission({id, permissions})
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, updatedRole, Messages.ROLE.UPDATED))
        } catch (error) {
            next(error)
        }
    }

    async removePermission(req: Request, res: Response, next: NextFunction) {
        try {
            const {name} = req.body;
            const id = req.params.id;
            const updatedRole = await this._roleService.removePermission({id, name});
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, updatedRole, Messages.ROLE.UPDATED))
        } catch (error) {
            next(error)
        }
    }

    async getRolePermissions(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const rolePermissions = await this._roleService.getRolePermissions(id);
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, rolePermissions, Messages.ROLE.PERMISSIONS_FETCHED)) 
        } catch (error) {
            next(error)
        }
    }

    async getRoles(req: Request, res: Response, next: NextFunction){
        try {
            const roles = await this._roleService.getRoles();
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, roles, Messages.ROLE.ROLES_FETECHED))
        } catch (error) {
            next(error)
        }
    }
}
