import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const validateToken = asyncHandler( async(req,res,next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) =>{
            if(err)
            {
                res.status(400);
                throw new Error("Not authorized user");
            }
            req.user=decoded.user;
            next();
        });
        if(!token)
        {
            res.status(401);
            throw new Error("user is not authorized or token is missing");
        }
    }
});

export default validateToken;