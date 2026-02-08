import express from "express";
const app = express();

import userRouter from './routes/user.route.js';

// Body parsing middlewares
app.use(express.json()); //handles json body
app.use(express.urlencoded({ extended: true })); //handles urlencoded body



// routes
app.use("/api/v1/users",userRouter);



export default app;