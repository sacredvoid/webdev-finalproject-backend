import mongoose from "mongoose";
import { EventSourceSchema } from "../event-source-schema.js";
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
    goingEventIds : {
        type:[EventSourceSchema],
        default: []
    },

    friendList:{
        friend_name: String,
        user_id: String,
    },
    likedEventIds:{type:Array, default:[]},
    createdDate:{type:Date, default:Date.now},
    
},{collection:"users"},)

