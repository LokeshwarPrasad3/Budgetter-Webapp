import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import userReportRoutes from "./routes/report.routes.js"

// const originURL = "http://localhost:5173";
const originURL = 'https://mybudgetter.netlify.app';

app.use(cors({
    origin: originURL,
    credentials: true,
}))

app.options('*', cors({
    origin: originURL,
    credentials: true,
}));


app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Api EndPoints
app.use("/api/user", userRoutes)
app.use("/api/user/report", userReportRoutes)


export { app }