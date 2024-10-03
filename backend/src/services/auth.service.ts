import UserRepository from "../repositories/user.repository";
import RoleRepository from "../repositories/role.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";
import { BcryptWrapper } from "../utils/bcrypt-wrapper";
import { JwtWrapper } from "../utils/jwt-wrapper";
import { Constants } from "../constants";

export default class AuthService {
  _userRepository: UserRepository;
  _roleRepository: RoleRepository;

  constructor(userRepository: UserRepository, roleRepository: RoleRepository) {
    this._userRepository = userRepository;
    this._roleRepository = roleRepository;
  }

  async registerUser(userBody: any) {
    const { username, password, role } = userBody;

    const isExist = await this._userRepository.findByUsername(username);
    if (isExist) {
      throw new ApiError(
        HttpStatusCodes.CONFLICT,
        Messages.USER.ALREADY_EXISTS
      );
    }

    const roleDoc = await this._roleRepository.findRoleByName(role);
    if (!roleDoc) {
      throw new ApiError(HttpStatusCodes.NOT_FOUND, Messages.ROLE.INVALID_ROLE);
    }

    const hashed = await BcryptWrapper.hash(password, 10);

    const user = await this._userRepository.createUser({
      username,
      hashed,
      roleDoc,
    });
    const responseUser = user?.toObject();
    delete responseUser.password;
    return responseUser;
  }

  async login(userBody: any) {
    const { username, password } = userBody;

    const user = await this._userRepository.findByUsernameWithPassword(
      username
    );
    if (!user) {
      throw new ApiError(
        HttpStatusCodes.NOT_FOUND,
        Messages.USER.INVALID_USERNAME
      );
    }

    const isPasswordCorrect = await BcryptWrapper.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new ApiError(
        HttpStatusCodes.UNAUTHORIZED,
        Messages.USER.INVALID_PASSWORD
      );
    }

    const payload = {
      id: user._id,
      roleId: user.role,
    };
    const secretKey = String(Constants.JWT_SECRET_KEY);
    const token = JwtWrapper.sign(payload, secretKey, { expiresIn: "1d" });

    const responseUser = user.toObject();
    delete responseUser.password;
    return { user: responseUser, token };
  }
}
