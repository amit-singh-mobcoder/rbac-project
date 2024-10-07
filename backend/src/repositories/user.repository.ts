import { UserModel, IUser } from "../models/user.model";

export default class UserRepository {
  async createUser(userDetails: any): Promise<IUser | null> {
    const { username, hashed, roleDoc, permissions } = userDetails;
    const user = new UserModel({
      username,
      password: hashed,
      role: roleDoc,
      permissions
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

  async findByIdAndDelete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  // async findByIdRemovePermission(id: string, updatedPermissions: string[]){
  //   const updatedUser = await UserModel.findByIdAndUpdate(id, {permissions: updatedPermissions}, {new: true});
  //   return updatedUser;
  // }

  // async findByIdAddPermission(id: string, updatedPermissions: string[]):Promise<IUser|null>{
  //   const updatedUserDoc = await UserModel.findByIdAndUpdate(id, {permissions: updatedPermissions}, {new: true});
  //   return updatedUserDoc;
  // }

  async usersList():Promise<IUser[]|null>{
    return UserModel.find()
  }

  async findByIdUpdatePermissions(userId:string, permissions: string[]):Promise<IUser|null>{
    const updatedUserDoc = await UserModel.findByIdAndUpdate(userId, {permissions: permissions}, {new: true});
    return updatedUserDoc;
  }
}
