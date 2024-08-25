import express from "express";
import { getContacts } from "../controllers/contactcontroller.js";
import { getContactsId } from "../controllers/contactcontroller.js";
import { createContacts } from "../controllers/contactcontroller.js";
import { updateContacts } from "../controllers/contactcontroller.js";
import { deleteContacts } from "../controllers/contactcontroller.js";
import validateToken from "../middleware/validateToken.js";
// import { Router } from "express";

const router = express.Router();

router.use(validateToken);

router.route("/").get(getContacts).post(createContacts);

router.route("/:id").get(getContactsId).put(updateContacts).delete(deleteContacts);

// router.route("/").post(createContacts);

// router.route("/:id").put(updateContacts);

// router.route("/:id").delete(deleteContacts);
 
export default router;