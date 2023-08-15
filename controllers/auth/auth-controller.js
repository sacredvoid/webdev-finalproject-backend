import {Router} from "express";
import { findUserByCredentials } from "../../mongo_db/daos/users-dao.js";

const authController = Router();

authController.post('/login', async(req,res)=>{
    console.log('in server auth controller')
    const username = req.body.username;
    const password = req.body.password;
    const user = await findUserByCredentials(username, password);
    console.log('in login ', user)
    if (user){
        req.session['currentUser'] = user;
        res.json(user);
    } else{
        res.sendStatus(404);
    }
});


export default authController;
