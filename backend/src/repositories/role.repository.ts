import { IRole, RoleModel } from "../models/role.model";

export default class RoleRepository {

    async findRoleByName(name: string): Promise<IRole | null>{
        const role = await RoleModel.findOne({role: name});
        return role;
    }
}