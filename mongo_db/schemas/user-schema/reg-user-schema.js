import mongoose from "mongoose";
export const RegUserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique : true
    },
    password:{
        type: String,
        required:true
    },
    privileges:{ type: Array,
        default: ['view','create','attend'],
    },
    createdEventIds:{ type: Array, default: []},
    goingEventIds:{ type: Array, default: []},
    friendList:{
        friend_name: String,
        user_id: String,
    },
    likedEventIds:{type:Array, default:[]},
    createdDate:{type:Date, default:Date.now},
    
},{collection:"users"},)

