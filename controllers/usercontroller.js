import asyncHandler from "express-async-handler";
import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//@desc register the user
//@route post api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) =>{
    const{ username,email,password } = req.body;
    if( !username || !email || !password )
    {
        res.status(400);
        throw new Error("All fileds are required");
    }
    const userAvailable=await User.findOne({ email });
    if(userAvailable)
    {
        res.status(400);
        throw new Error("already existed user");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const  user =await User.create({
        username,
        email,
        password:hashedPassword
    });
    // console.log("hashed is",hashedPassword);
    if(user)
    {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    }
    else
    {
        res.status(400);
        throw new Error("user data is not valid");
    }
    // res.status(201).json(user);
});

const loginUser=asyncHandler(async(req, res) =>{
    const { email,password} = req.body;
    if( !email || !password){
        res.status(400);
        throw new Error("All fields mandatory");
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken = jwt.sign(
        {
            user:
            {
                username : user.username,
                email : user.email,
                id : user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:"15m" }
    );
        res.status(200).json({ accessToken });
    }
    else
    {
        res.status(400);
        throw new Error("Email or password is not valid");
    }
    res.json({"message":"login the user"});
});

const infoUser=asyncHandler(async(req, res) =>{
    res.json(req.user);
});

export {registerUser,loginUser,infoUser};