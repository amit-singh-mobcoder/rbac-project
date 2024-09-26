import { UserModel, IUser } from "../models/user.model";

export default class UserRepository {
  async createUser(userDetails: any): Promise<IUser | null> {
    const { username, hashed, roleDoc } = userDetails;
    const user = new UserModel({
      username,
      password: hashed,
      role: roleDoc,
    });
    return user.save();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = UserModel.findOne({ username });
    return user;
  }

  async findByUsernameWithPassword(username: string): Promise<IUser | null> {
    const user = UserModel.findOne({ username }).select("+password");
    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = UserModel.findById(id);
    return user;
  }
}
