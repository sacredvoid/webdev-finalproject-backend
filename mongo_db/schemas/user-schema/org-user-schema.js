import { Schema } from "mongoose";

export const OrgUserSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    orgData:{
        orgName: {type: String,required: true},
        orgId: {type:String, required: true}
        
    },
    privileges:{ type: Array,
        default: ['view','create'],
    },
    createdEventIds:{ type: Array, default: []},
    guestList:{
        eventId : String,
        usersInterested : Array,
    },
    createdDate:{type:Date, default:Date.now},
    
},{collection:"users"});

