import {Router} from "express";
import { createOrganizaitonUser, createRegular, findUserByCredentials, findUserByUsername } from "../../mongo_db/daos/users-dao.js";

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

authController.post('/register', async(req,res) => {
    console.log('in authcontroller')
    console.log(req.body)
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
        req.session["currentUser"] = newUser;
        res.json(newUser);
        
    }catch(error){
        res.status(500).json(error)
    }
    

})

authController.post('/profile', (req,res) => {
    const currentUser = req.session['currentUser'];
    if(currentUser){
        res.json(currentUser);
    } else{
        res.sendStatus(403);
    }
})

authController.post('/logout', (req,res) => {
    req.session.destroy();
    res.sendStatus(200);
})

export default authController;

