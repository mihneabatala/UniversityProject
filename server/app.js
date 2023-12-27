import express from "express";
import dotenv from "dotenv";
import subscriberRouter from "./routes/subscriber-routes.js";
import newspaperRouter  from "./routes/newspaper-routes.js"
import { errorHandler } from "./helpers/errorHandler.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use('/subscriber',subscriberRouter);
app.use('/newspaper',newspaperRouter);

app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port " + process.env.PORT); 
})  