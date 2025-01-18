import { Router } from 'express';
import * as resumeController from '../controllers/resumeController';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Apply auth middleware to all routes in this router
router.use(auth as any);  // Type assertion needed due to Express types limitation

// Resume routes
router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.get('/analysis/:id', resumeController.getResumeAnalysis);
router.get('/user', resumeController.getUserResumes);
router.delete('/:id', resumeController.deleteResume);

export default router;