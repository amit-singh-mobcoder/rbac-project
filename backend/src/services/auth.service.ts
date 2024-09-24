import { Constants } from "../constants";
import UserRepository from "../repositories/user.repository";
import { ApiError } from "../utils/api-error";
import { BcryptWrapper } from "../utils/bcrypt-wrapper";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { JwtWrapper } from "../utils/jwt-wrapper";
import { Messages } from "../utils/messages";

export default class AuthService {
    _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async registerUser(requestObject: any){
        const { requestBody } = requestObject;
        const {username, password, role} = requestBody;

        if(!username || !password || !role) {
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.GENERIC.BAD_REQUEST);
        }

        const existedUser = await this._userRepository.findUserByUsername(username);
        if(existedUser){
            throw new ApiError(HttpStatusCodes.CONFLICT, Messages.USER.USER_ALREADY_EXISTS)
        }

        const hashed = await BcryptWrapper.hash(password, 10);

        const newUser = await this._userRepository.createUser({username, hashed, role});

        return newUser;
    }

    async loginUser(requestObject: any){
        const { requestBody } = requestObject;
        const { username, password } = requestBody;

        if(!username || !password){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.GENERIC.BAD_REQUEST);
        }

        const user = await this._userRepository.findUserByUsername(username);
        if(!user){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, Messages.USER.USER_NOT_FOUND);

        }

        const isPasswordCorrect = await BcryptWrapper.compare(password, user.password);
        if(!isPasswordCorrect){
            throw new ApiError(HttpStatusCodes.UNAUTHORIZED, Messages.AUTH.LOGIN_FAILED);
        }

        const payload = {
            id: user._id,
            role: user.role
        }
        const secretKey = String(Constants.JWT_SECRET_KEY);
        const token = JwtWrapper.sign(payload, secretKey, {expiresIn: '1h'});
        
        return {user, token}
    }
}