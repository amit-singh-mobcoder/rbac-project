import { IRole, RoleModel } from "../models/role.model";

export default class RoleRepository {

    async findRoleByName(roleName: string): Promise<IRole | null>{
        const role = await RoleModel.findOne({role: roleName});
        return role;
    }
}