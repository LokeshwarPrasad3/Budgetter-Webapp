import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import morgan from 'morgan';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import userReportRoutes from './routes/report.routes.js';
const FRONTEND_URL = process.env.FRONTEND_URL;
const DEV_FRONTEND_URL = process.env.DEV_FRONTEND_URL;

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const allowedOrigins = [FRONTEND_URL, DEV_FRONTEND_URL];
const netlifyPreviewPattern = /^https:\/\/deploy-preview-\d+--mybudgetter\.netlify\.app$/;
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin || // allow non-browser tools like curl/postman
        allowedOrigins.includes(origin) ||
        netlifyPreviewPattern.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Budgetter API' });
});

// Api EndPoints
app.use('/api/user', userRoutes);
app.use('/api/user/report', userReportRoutes);

export { app };
