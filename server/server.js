import path from "path";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cookieParser from "cookie-parser";

//Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/getUser.routes.js";
import groupRoutes from "./routes/group.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5001;


const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming request with json payloads from req.body
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/getUsers", userRoutes);
app.use("/api/groups", groupRoutes);

// app.get("/" , (req , res)=>{
//     res.send("hello world//////")
// })

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`server running on port ${PORT}`);
});
