import mongoose from "mongoose";
import BaseUserModel from "./base-user-model.js";

BaseUserModel.discriminator("guest",{})
const GuestUserModel = mongoose.model("guest")

export default GuestUserModel
