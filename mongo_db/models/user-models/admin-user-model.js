import  BaseUserModel  from "./base-user-model.js";
import { AdminUserSchema } from "../../schemas/user-schema/admin-user-schema.js";
import mongoose from "mongoose";

BaseUserModel.discriminator("admin", AdminUserSchema)
const AdminUserModel = mongoose.model("admin")

export default AdminUserModel