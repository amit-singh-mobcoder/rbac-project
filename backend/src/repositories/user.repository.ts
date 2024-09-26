import { UserModel, IUser } from "../models/user.model";

export default class UserRepository {

    async createUser(userDetails: any): Promise<IUser|null> {
        const user = new UserModel({
            username: userDetails.username,
            password: userDetails.password,
            roles: userDetails.roles
        })
        return user.save()
    }
}