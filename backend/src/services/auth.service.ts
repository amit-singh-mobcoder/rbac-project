import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";

export default class AuthService {
  _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async registerUser(userDetails: any) {
    const { username, password, roles } = userDetails;
    const user = await this._userRepository.createUser({
      username,
      password,
      roles,
    });

    return user;
  }
}
