import UserRepository from "../repositories/user.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";

export default class UserService {
    _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
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
}