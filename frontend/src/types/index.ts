export interface Resume {
  id?: string;
  fileName: string;
  fileUrl: string;
  analysis?: {
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
  createdAt?: Date;
  updatedAt?: Date;
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