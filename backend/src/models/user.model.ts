import mongoose, { Document, Schema } from "mongoose";
import { IRole } from "./role.model";

interface IUser extends Document {
  username: string;
  password: string;
  roles: IRole[];
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ username: 1 })
export const UserModel = mongoose.model<IUser>("User", userSchema);