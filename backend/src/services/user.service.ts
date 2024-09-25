import UserRepository from "../repositories/user.repository";

export default class UserService {

    _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async helloAdmin(){
        return "hello, only admins can access this route";
    }

    async helloManager(){
        return "hello, only admins and manager can access this route";
    }

    async helloUsers(){
        return "hello, all can access this route"
    }
}