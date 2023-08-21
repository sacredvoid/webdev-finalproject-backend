import  AdminUserModel  from "../models/user-models/admin-user-model.js";
import  BaseUserModel  from "../models/user-models/base-user-model.js";
import  GuestUserModel  from "../models/user-models/guest-user-model.js";
import OrgUserModel from "../models/user-models/organization-user-model.js";
import RegUserModel from "../models/user-models/reg-user-model.js";

const userTypeMap = {
    "regular": RegUserModel,
    "organization": OrgUserModel,
    "guest": GuestUserModel,
    "admin": AdminUserModel,
}
//create a GuestUser
export const createGuest = (user) =>{
    return GuestUserModel.create(user)
}

//create a Registered User
export const createRegular = (user) =>{
    return RegUserModel.create(user)
}

//create a Organizaiton User
export const createOrganizaitonUser = (user) => {
     return OrgUserModel.create(user)
}

//create a Admin User
export const createAdmin = (user) =>{
    return AdminUserModel.create(user)
}
//find all users
export const findAllUsers = async () =>{
    try{
        return BaseUserModel.find()
    }
    catch(error){
        console.log('Error fetching users: ', error)
    }
   
}

//find users by type
export const findUsersByType = (type) =>{

    return BaseUserModel.find({"user_type":type})
    
}

//find user by id
export const findUserById = (id) =>{
    BaseUserModel.findById(id) 
}

//find user by firstname

export const findUserByUsername = (username) => {
    return BaseUserModel.findOne({"username":username})
}

//find user by credentials

export const findUserByCredentials = async (username, password) =>{
    return await BaseUserModel.findOne({"username": username,"password": password})
}


//find organization by Organization details
export const findUsersByOrgDetails = (orgId,orgName) =>{
    return OrgUserModel.find({'orgData.orgId':orgId, 'orgData.orgName':orgName})
}


//updat a user information
export const updateUser = (id, user)=>{
    return userTypeMap[user.user_type].updateOne({_id : id}, {$set: user})
}

//delete a user
export const deleteUser = (id)=>{
    return BaseUserModel.deleteOne({_id:id})
}

