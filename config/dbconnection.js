import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDb()
{
    try
    {
        const connect=await mongoose.connect(process.env.URI);
        console.log("Database connected:", connect.connection.host,connect.connection.name);
    }
    catch (err)
    {
        console.log(err);
        process.exit(1);
    }
};

export default connectDb;
