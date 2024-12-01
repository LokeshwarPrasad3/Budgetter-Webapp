import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import userReportRoutes from "./routes/report.routes.js"
import compression from "compression";

const allowedOrigins = [
    'https://mybudgetter.netlify.app', // Original Netlify URL
    'https://67029ff2fc8f7e00089c9b8e--mybudgetter.netlify.app', // New production Netlify URL
    'http://localhost:5173', // Local
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.options('*', cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(compression());
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Api EndPoints
app.use("/api/user", userRoutes)
app.use("/api/user/report", userReportRoutes)


export { app }