import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  role: string;
  permissions: [{name: string, description?: string}];
}

const roleSchema: Schema<IRole> = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

roleSchema.index({ role: 1 })
export const RoleModel = mongoose.model<IRole>("Role", roleSchema);
