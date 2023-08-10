import { Schema } from "mongoose";

export const BaseUserSchema =  new Schema({
    firstname:{type: String, required:true},
    lastname:{type:String, required:true},
    privileges:{type:Array, default:['view']},
},{discriminatorKey:"user_type",collection:"users"})

