import mongoose from "mongoose";
import { roles } from "../utils/constants.js";

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
      },
      hashPassword: {
        type: String,
        required: true,
        minLength: 6,
      },
      firstName: {
        type: String,
        required: true,
        maxLength: 50,
      },
      lastName: {
        type: String,
        required: true,
        maxLength: 50,
      },
      role: {
        type: String,
        enum: [roles.admin, roles.user],
        default: roles.user,
      },
      notification: {
        type: Array,
        default: [],
      },
      seenNotification: {
        type: Array,
        default: [],
      },
    },
    { timestamps : true }
  );
const User = mongoose.model("User", userSchema);

export default User;