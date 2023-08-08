// import mongoose from "mongoose";
// import { Schema } from "mongoose";
// import { Model } from "mongoose";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    roles: [{
        type:String,
        default: "Guest"
    }],
    active: {
        type:Boolean,
        default: true
    },


})

const userModel = mongoose.model('User', userSchema)

export default userModel