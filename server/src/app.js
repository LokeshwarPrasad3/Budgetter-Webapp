import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import { ApiResponse } from "./utils/ApiResponse.js";

app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send(
        new ApiResponse(200, [], "Successfully route to / ")
    )
})


export { app }