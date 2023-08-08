import mongoose from "mongoose";
import "dotenv/config";

const db_uri = process.env.ATLAS_URI

const connectDB = async () => {
    try{
        await mongoose.connect(db_uri, {
            useNewUrlParser: true,
        });

        console.log('db connected');
    } catch(err){
        console.error(err.message)
    }

}

export default connectDB;