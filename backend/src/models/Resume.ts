import mongoose, { Document, Schema } from 'mongoose';

export interface IResume extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  fileName: string;
  originalText: string;
  parsedSections: {
    contact: {
      [key: string]: string;
    };
    education: Array<{
      institution: string;
      degree: string;
      field: string;
      startDate?: Date;
      endDate?: Date;
      gpa?: number;
    }>;
    experience: Array<{
      company: string;
      title: string;
      location?: string;
      startDate?: Date;
      endDate?: Date;
      descriptions: string[];
    }>;
    skills: string[];
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
    }>;
  };
  analysis: {
    overallScore: number;
    companyScores: Array<{
      company: string;
      score: number;
      strengths: string[];
      weaknesses: string[];
    }>;
    improvements: Array<{
      section: string;
      suggestions: string[];
      priority: 'high' | 'medium' | 'low';
    }>;
  };
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  originalText: {
    type: String,
    required: true,
  },
  parsedSections: {
    contact: {
      type: Map,
      of: String,
    },
    education: [{
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      gpa: Number,
    }],
    experience: [{
      company: String,
      title: String,
      location: String,
      startDate: Date,
      endDate: Date,
      descriptions: [String],
    }],
    skills: [String],
    projects: [{
      name: String,
      description: String,
      technologies: [String],
    }],
  },
  analysis: {
    overallScore: {
      type: Number,
      required: true,
    },
    companyScores: [{
      company: String,
      score: Number,
      strengths: [String],
      weaknesses: [String],
    }],
    improvements: [{
      section: String,
      suggestions: [String],
      priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
      },
    }],
  },
  fileUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IResume>('Resume', resumeSchema);