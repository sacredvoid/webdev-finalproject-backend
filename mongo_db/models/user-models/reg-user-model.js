import  BaseUserModel  from "./base-user-model.js";
import {RegUserSchema} from "../../schemas/user-schema/reg-user-schema.js"
import mongoose from "mongoose";

BaseUserModel.discriminator("regular",RegUserSchema)
const RegUserModel = mongoose.model("regular")
export default RegUserModel 
