import {Router} from "express";
// import * as usersDao from "../../mongo_db/daos/users-dao.js";
import { findUserByCredentials } from "../../mongo_db/daos/users-dao.js";

const authController = Router();

authController.post('/login', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await findUserByCredentials(username, password);
    if (user){
        console.log(user)
        req.session['currentUser'] = user;
        res.json(user);
    } else{
        res.sendStatus(404);
    }
});


export default authController;
