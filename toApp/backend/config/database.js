import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config({ path: "./backend/.env" });
dns.setServers(["8.8.8.8"]);
const connectDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('la connexion marche bien')
    }

    catch(error){
        console.error('error à la connexion mongoDB:', error.message);
        process.exit(1);
    }
}

export default connectDB;
