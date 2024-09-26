import UserRepository from "../repositories/user.repository";

export default class UserService {
    _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async getProfile(id: string){
        const user = await this._userRepository.findById(id);
        return user;
    }
}