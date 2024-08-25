import express from "express";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "please add the email address"],
        unique:[true,"email is already taken"]
    },
    password: {
        type: String,
        required: [true, "please add the password"]
    }
},
{
    timestamp:true
}
);

const User = mongoose.model("User", userSchema);
export default User;