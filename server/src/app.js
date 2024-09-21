import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Api EndPoints
app.use("/api/user", userRoutes)


export { app }