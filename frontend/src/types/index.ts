export interface Resume {
  name: string;
  id?: string;
  fileName: string;
  fileUrl: string;
  analysis?: ResumeAnalysis;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ResumeCandidate {
  name: string;
}
export interface ResumeAnalysis {
  overallScore: number;
  companyScores: CompanyScore[];
  improvements: Improvement[];
}

export interface CompanyScore {
  company: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
}

export interface Improvement {
  section: string;
  suggestions: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}