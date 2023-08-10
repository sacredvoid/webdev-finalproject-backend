import { Router } from "express";
import { createRegular ,createAdmin, createGuest, createOrganizaitonUser, findAllUsers, findUsersByType, findUserByUsername, findUserByCredentials, findUsersByOrgDetails, deleteUser, findUserById, updateUser} from "../mongo_db/daos/users-dao.js";

const userController = Router();

// create a new user
userController.post('/users', async(req,res)=>{

    const userDetails = req.body;
    const userInfo = userDetails.info;
    const user_type = userDetails.user_type;
    let user = null
    try{
        
        if(user_type === 'regular'){
           user =  await createRegular(userInfo)
        }else if(user_type === 'organization'){
            user = await createOrganizaitonUser(userInfo)
        }else if (user_type === 'admin'){
           user = await createAdmin(userInfo)

        }else{
            user = await createGuest(userInfo)
        }
        
        // const saveUser = newUser.save();
        res.status(201).json(user)
    } catch(err){
        console.log(err)
        res.status(400).json({message: err.message});
    }
})


// retrieve users based on credentials or org detials or user_type
userController.get("/users", async (req,res) =>{
    try{
        const findUsing = req.query.findUsing;
        let user = null
        if (findUsing === 'credentials'){
            const username = req.query.username;
            const password = req.query.password;
            if (username && password){
                user = await findUserByCredentials(username, password)
            } else if (username){
                user = await findUserByUsername(username)
            } else {
                user = await findAllUsers()
            }
        }
        else if(findUsing === 'user_type'){
            const user_type = req.query.user_type
            user = await findUsersByType(user_type)
            // res.json(specificTypeUsers)
        }
        else if(findUsing === 'orgDetails'){
            const orgId = req.query.orgId;
            const orgName = req.query.orgName;
            user = await findUsersByOrgDetails(orgId, orgName)
        }else{
            user = await findAllUsers()
        }

        res.json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// delete users
userController.delete('/users/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const status = await deleteUser(id);
        res.status(200).json(status);
    }catch(error){
        res.status(500).json({message: error.message})
    }
    
})

//udate user
userController.put('/users/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const status = await updateUser(id,req.body);
        // const updated_user = await findUserById(id)
        res.json(status)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
export default userController