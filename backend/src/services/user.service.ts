import RoleRepository from "../repositories/role.repository";
import UserRepository from "../repositories/user.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";

export default class UserService {
    _userRepository: UserRepository;
    _roleRepository: RoleRepository;

    constructor(userRepository: UserRepository, roleRepository: RoleRepository){
        this._userRepository = userRepository;
        this._roleRepository = roleRepository;
    }

    async getProfile(id: string){
        const user = await this._userRepository.findById(id);
        return user;
    }
    
    async deleteUser(id: string){
        const user = await this._userRepository.findById(id);
        if(!user){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, 'Invalid user id')
        }
        await this._userRepository.findByIdAndDelete(id);
    }

    async removePermission(data: {id: string, name: string}){
        const {id, name} = data;
        const user = await this._userRepository.findById(id);
        const permissions = user?.permissions;

        const updatedPermissions = permissions?.filter(permission => permission !== name)
        let updatedUser;
        if(Array.isArray(updatedPermissions)){
            updatedUser = await this._userRepository.findByIdRemovePermission(id, updatedPermissions)
        }
        return updatedUser;
    }

    async addPermission(data: {id: string, name: string}){
        const {id, name} = data;
        const user = await this._userRepository.findById(id);
        const permissions = user?.permissions;
        
        let updatedUser;
        if(Array.isArray(permissions)){
            if(permissions.includes(name)){
                throw new ApiError(HttpStatusCodes.CONFLICT, 'Permission already exist')
            } else {
                permissions.push(name);
                updatedUser = await this._userRepository.findByIdAddPermission(id, permissions)
            }
        }
        return updatedUser;
    }

    async usersList(role:string){
        const usersDocList = await this._userRepository.usersList();
        // console.log(usersDocList);
        const roleDoc = await this._roleRepository.findRoleByName(role);
        const roleObj = roleDoc?.toObject();
        // console.log("roleDoc",roleObj)
        const roleId = roleObj._id.toString();
        // console.log("role id", roleId)

        let users;
        if(Array.isArray(usersDocList)){
            users = usersDocList.filter((user) => {
                const userRoleId = user.role.toString();
                return roleId === userRoleId;
            })
        }
        // console.log(users)
        return users;
    } 
}