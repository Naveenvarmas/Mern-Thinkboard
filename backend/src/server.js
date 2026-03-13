import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Use Google and Cloudflare DNS

import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 8080; 


//middleware
app.use(
  cors({
    origin:"http://localhost:5173",
  }))
app.use(express.json());
app.use(rateLimiter)



app.use("/api/notes",notesRoutes)

connectDB().then(()=>{
app.listen(PORT,()=>{
  console.log("server started on Port:",PORT);
}); 

});

 