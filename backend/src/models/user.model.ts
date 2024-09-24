import mongoose, {Document, Schema} from "mongoose";
import { Roles } from "../constants";

interface IUser extends Document {
    username: string;
    password: string;
    role: string;
}

const userSchema: Schema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: [Roles.admin, Roles.manager, Roles.user],
            default: Roles.user
        }
    },
    {timestamps: true}
)

export const UserModel = mongoose.model<IUser>('User', userSchema)