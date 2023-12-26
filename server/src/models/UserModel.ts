import mongoose, { Document, Schema, Model } from "mongoose";
interface UserType {
  name: string;
  email: string;
  password: string;
  salt: string;
}
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);

const UserModel = mongoose.model<UserType>("User", userSchema);

export default UserModel;
