import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.routes.js';
import interviewRoutes from './routes/interview.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173','https://interview-p.netlify.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'X-Refresh-Token', 'Content-Type'],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Mockly app running on this port');
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/interview', interviewRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

export { app };