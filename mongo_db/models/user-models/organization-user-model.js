import BaseUserModel from "./base-user-model.js";
import { OrgUserSchema } from "../../schemas/user-schema/org-user-schema.js";
import mongoose from "mongoose";

BaseUserModel.discriminator("organization",OrgUserSchema)
const OrgUserModel = mongoose.model("organization")

export default OrgUserModel