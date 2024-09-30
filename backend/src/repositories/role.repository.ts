import { IRole, RoleModel } from "../models/role.model";
import { IRoleDetails } from "../services/role.service";

export default class RoleRepository {

    async findRoleByName(roleName: string): Promise<IRole | null>{
        const role = await RoleModel.findOne({role: roleName});
        return role;
    }

    async createRole(roleDetails: IRoleDetails): Promise<IRole|null>{
        const {role, permissions} = roleDetails;
        const newRole = new RoleModel({role, permissions})
        return await newRole.save();
    }

    async findRoleById(id: string): Promise<IRole | null> {
        const role = await RoleModel.findById(id);
        return role;
    }

    async findRoleAddPermission(id: string, permissions: [{name: string, description?:string}]): Promise<IRole | null> {
        const updatedRole = await RoleModel.findByIdAndUpdate(id, {$push: {permissions}}, {new: true});
        return updatedRole;
    }

    async findRoleRemovePermission(id: string, permissionName: string){
        const updatedRoleDoc = await RoleModel.findByIdAndUpdate(id, {$pull: { permissions: {name: permissionName}}}, {new: true});
        return updatedRoleDoc;
    }

    async rolesList(): Promise<IRole[]| null> {
        const roles = await RoleModel.find();
        return roles;
    }
}