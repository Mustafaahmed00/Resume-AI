import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import config from './config';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import { MulterError } from 'multer';

const app: Express = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Error handling middleware with void return type
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    name: err.name
  });
  
  if (err instanceof MulterError) {
    res.status(400).json({ 
      message: 'File upload error',
      details: err.message 
    });
    return;
  }
  
  res.status(500).json({ 
    message: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');
    
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
      console.log(`CORS enabled for origin: http://localhost:5173`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer();

export default app;