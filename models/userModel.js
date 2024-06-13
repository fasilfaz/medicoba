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
      bloodGroup: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: [roles.admin,roles.patient],
        default: roles.patient,
      },
      phoneNumber: {
        type: Number,
        required: true,
        maxLength: 10,
      },
      notifications: {
        type: Array,
        default: [],
      },
      seennotifications: {
        type: Array,
        default: [],
      },
      services: [{ type: mongoose.Types.ObjectId, ref: "Service"}],
      
      
    },
    { timestamps : true }
  );
const User = mongoose.model("User", userSchema);

export default User;