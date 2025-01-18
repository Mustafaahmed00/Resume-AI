import { Response, Request, RequestHandler } from 'express';
import { AuthRequest } from '../middleware/auth';
import Resume from '../models/Resume';
import { ResumeAnalysisService } from '../services/ResumeAnalysis';
const analysisService = ResumeAnalysisService.getInstance();

interface CustomRequestHandler extends RequestHandler {
  (req: AuthRequest, res: Response): Promise<void>;
}

export const uploadResume: CustomRequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const analysis = await analysisService.analyzeResume(req.file.path);
    const text = await analysisService.parsePDF(req.file.path);

    const resume = new Resume({
      userId: req.user!._id,
      fileName: req.file.originalname,
      originalText: text,
      analysis,
      fileUrl: req.file.path
    });

    await resume.save();

    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume: {
        id: resume._id,
        fileName: resume.fileName,
        analysis: resume.analysis
      }
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: 'Error uploading resume' });
  }
};

export const getResumeAnalysis: CustomRequestHandler = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!resume) {
      res.status(404).json({ message: 'Resume not found' });
      return;
    }

    res.json({
      analysis: resume.analysis
    });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ message: 'Error getting resume analysis' });
  }
};

export const getUserResumes: CustomRequestHandler = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user!._id })
      .select('fileName analysis.overallScore createdAt')
      .sort({ createdAt: -1 });

    res.json({ resumes });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Error getting resumes' });
  }
};

export const deleteResume: CustomRequestHandler = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!resume) {
      res.status(404).json({ message: 'Resume not found' });
      return;
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Error deleting resume' });
  }
};