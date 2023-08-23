import {Router} from "express";
import { createOrganizaitonUser, createRegular, findUserByCredentials, findUserByUsername } from "../../mongo_db/daos/users-dao.js";

const authController = Router();

authController.post('/login', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await findUserByCredentials(username, password);
    const state_object = {
        details : user,
        loggedIn : true
    }
    if (user){
        req.session['currentUser'] = state_object;
        res.json(state_object);
    } else{
        res.sendStatus(404);
    }
});

authController.post('/register', async(req,res) => {
    const formType = req.body.form_type;
    const formData = req.body.formData;
    const username = formData.username;
    let newUser = null;
    const user = await findUserByUsername(username);
    
    try{
        if(user){
            res.sendStatus(403);
            return;
        }
        if(formType === "reg-user"){
            newUser = await createRegular(formData);
        }
        else if (formType === "org-user"){
            newUser = await createOrganizaitonUser(formData)
        }
        const state_object = {
            details : newUser,
            loggedIn : true
        }
        req.session["currentUser"] = state_object;
        res.json(state_object);
        
    }catch(error){
        res.status(500).json(error)
    }
    

})

authController.post('/profile', (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log(currentUser)
    if (!currentUser) {
        res.sendStatus(404);
        return;
    }
    res.json(currentUser);
});

authController.post('/logout', (req,res) => {
    req.session.destroy();
    res.sendStatus(200);
})

export default authController;
