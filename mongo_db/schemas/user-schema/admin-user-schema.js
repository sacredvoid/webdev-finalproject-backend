import { Schema } from "mongoose";

export const AdminUserSchema =  new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    privileges:{type:Array, default:['view','create','attend','modify']},
    createdDate:{type:Date, default:Date.now},
},{collection:"users"})