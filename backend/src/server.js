import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Use Google and Cloudflare DNS

import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import path from "path";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 8080; 
const __dirname=path.resolve();


//middleware
if(process.env.NODE_ENV !== "production"){
app.use(
  cors({
    origin:"http://localhost:5173",
  }))
}
app.use(express.json());
app.use(rateLimiter)



app.use("/api/notes",notesRoutes)

if (process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res) =>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}


connectDB().then(()=>{
app.listen(PORT,()=>{
  console.log("server started on Port:",PORT);
}); 

});

 