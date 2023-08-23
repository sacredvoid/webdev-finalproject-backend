import { Schema } from "mongoose";

export const BaseUserSchema =  new Schema({
    firstname:{type: String, required:true},
    lastname:{type:String, required:true},
    privileges:{type:Array, default:['view']},
    tags:[String],
    email:String,
    address:{
        addressLine1:String,
        addressLine2:String,
        city:String,
        stateName:String,
        zipcode:Number,
        country:String,
    }
},{discriminatorKey:"user_type",collection:"users"})

