import express from "express";
import { registerUser } from "../controllers/usercontroller.js";
import { loginUser } from "../controllers/usercontroller.js";
import { infoUser } from "../controllers/usercontroller.js";
import validateToken from "../middleware/validateToken.js";
const router1=express.Router();
router1.post("/register", registerUser);

router1.post("/login", loginUser);

router1.get("/info", validateToken,infoUser);

export default router1;