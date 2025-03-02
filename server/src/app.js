import dotenv from "dotenv";
dotenv.config({ path: ".env" })
import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import userReportRoutes from "./routes/report.routes.js"
const FRONTEND_URL = process.env.FRONTEND_URL

const allowedOrigins = [
    FRONTEND_URL, 
    /\.netlify\.app$/, // Allow all Netlify deploy previews
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some(pattern =>
            typeof pattern === 'string' ? pattern === origin : pattern.test(origin))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Api EndPoints
app.use("/api/user", userRoutes)
app.use("/api/user/report", userReportRoutes)


export { app }