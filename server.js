import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import ejslayout from "express-ejs-layouts";
import {connectDB} from "./config/mongodb.js";
import userRouter from "./routers/user.js";
import bookRouter from "./routers/book.js";
import cookieParser from "cookie-parser";

// environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// express init 
const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//static folder
app.use(express.static('public'));

// ejs template setup
app.set("view engine", "ejs");
app.set("layout", "layouts/app");
app.use(ejslayout);

// route
app.use('/api/v1', userRouter)
app.use('/api/v1', bookRouter)



// listen
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`.bgMagenta.black);
})