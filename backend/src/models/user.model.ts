import mongoose, { Document, Schema } from "mongoose";
import { IRole } from "./role.model";

export interface IUser extends Document {
  username: string;
  password: string;
  role: IRole;
  permissions: Array<string>
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
      select: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    permissions: [
      {
        type: String,
      }
    ]
  },
  { timestamps: true }
);

userSchema.index({ username: 1 });
export const UserModel = mongoose.model<IUser>("User", userSchema);
