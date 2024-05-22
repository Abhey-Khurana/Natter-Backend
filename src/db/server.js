import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`HOST : ${connectionInstance.connection.host}`);
    }
    catch (err) {
        console.log("MONGODB connection FAILED ", err);
        process.exit(1)
    }
}

export { connectDB };