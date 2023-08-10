import mongoose from "mongoose";
import {BaseUserSchema} from "../../schemas/user-schema/base-user-schema.js"

const BaseUserModel = mongoose.model("BaseUserSchema",BaseUserSchema)
export default BaseUserModel