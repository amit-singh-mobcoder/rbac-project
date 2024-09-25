import { UserModel } from "../models/user.model";

export default class UserRepository {

    async createUser(userDetails: any): Promise<any>{
        const {username, hashed, role} = userDetails;
        const newUser = new UserModel({username, password: hashed, role});
        return await newUser.save();
    }

    async findUserByUsername(username: string): Promise<any>{
        const user = await UserModel.findOne({username});
        return user;
    }

    async findUserById(id: string): Promise<any>{
        const user = await UserModel.findById(id);
        return user;
    }
}