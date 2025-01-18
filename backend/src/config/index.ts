import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeai',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  env: process.env.NODE_ENV || 'development',
  allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
};

export default config;