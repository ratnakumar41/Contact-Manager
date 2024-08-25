import express from "express";
import dotenv from "dotenv";
import router from "./routes/contactroutes.js";
import errorHandler from "./middleware/errorhandler.js";
import connectDb from "./config/dbconnection.js";
import router1 from "./routes/userroutes.js";

connectDb();

dotenv.config();

const app=express();
const port=process.env.PORT || 3001;

// app.get("/", (req, res) => {
//     res.send("hai");
// });

app.use(express.json());
app.use("/api/contacts", router);
app.use("/api/users", router1);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running in port: ${port}`);
});