import { isValidObjectId } from "mongoose";
import RoleRepository from "../repositories/role.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";

export interface IRoleDetails {
    role: string;
    permissions: [{name: string, description?:string}]
}

export default class RoleService {
    _roleRepository: RoleRepository;
    
    constructor(roleRepository: RoleRepository){
        this._roleRepository = roleRepository;
    }

    async newRole(roleDetails: IRoleDetails){
        const {role, permissions} = roleDetails;
        const isExist = await this._roleRepository.findRoleByName(role);
        if(isExist){
            throw new ApiError(HttpStatusCodes.CONFLICT, Messages.ROLE.ALREADY_EXISTS);
        }

        const newRole = await this._roleRepository.createRole({role, permissions})
        return newRole;
    }

    async addPermission(data: {id: string, permissions: [{name: string, description?:string}]}){
        const {id, permissions} = data;
        if(!isValidObjectId(id)){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.VALIDATION.INVALID_OBJECT_ID)
        }
        const role = await this._roleRepository.findRoleById(id);
        if(!role){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, Messages.ROLE.NOT_FOUND)
        }
        // console.log('permissions: ',permissions);
        // console.log('role', role);
        const rolePermissions = role?.permissions;
        if(Array.isArray(rolePermissions)){

            for(const permission of rolePermissions){

                if(permissions.find(per => per.name === permission.name)){
                    throw new ApiError(HttpStatusCodes.CONFLICT, `${permission.name}: ${Messages.ROLE.PERMISSION_EXISTS}`)
                }
            }
        }

        const updatedRoleDoc = await this._roleRepository.findRoleAddPermission(id, permissions);
        return updatedRoleDoc;
    }

    async removePermission(data: {id: string, name: string}) {
        const {id, name} = data;
        if(!isValidObjectId(id)){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.VALIDATION.INVALID_OBJECT_ID);
        }

        const role = await this._roleRepository.findRoleById(id);
        if(!role){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.ROLE.NOT_FOUND)
        }

        const rolePermissions = role?.permissions;
        const isExist = rolePermissions.find(item => item.name === name)
        if(!isExist){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, Messages.ROLE.PERMISSION_NOT_FOUND);
        }

        const updatedRoleDoc = await this._roleRepository.findRoleRemovePermission(id, name);
        return updatedRoleDoc;
    }

    async getRolePermissions(id: string){
        if(!isValidObjectId(id)){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.VALIDATION.INVALID_OBJECT_ID)
        }

        const role = await this._roleRepository.findRoleById(id);
        if(!role){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, Messages.ROLE.NOT_FOUND)
        }

        return role?.permissions;
    }

    async getRoles(){
        const roles = await this._roleRepository.rolesList();
        return roles;
    }

    async getRole(id: string){
        if(!isValidObjectId(id)){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.VALIDATION.INVALID_OBJECT_ID)
        }
        const role = await this._roleRepository.findRoleById(id);
        if(!role){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, Messages.ROLE.NOT_FOUND)
        }

        return role;
    }
}