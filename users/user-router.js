import { Router } from "express";
// import {userModel} from "../models/user-model.js";
import userModel from "../models/user-model.js";

const userRouter = Router();

// create a new user
userRouter.post('/users', async(req,res)=>{
    try{
        console.log(userModel)
        const newUser= new userModel(req.body);
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch(err){
        console.log(err)
        res.status(400).json({message: err.message});
    }
})

// retrieve all users
userRouter.get("/users",async (req,res) => {
    try{
        const users = await userModel.find();
        res.json(users);
    }
    catch (err){
        res.status(500).json({message :err.message});
    }

});

export default userRouter