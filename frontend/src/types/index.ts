export interface Resume {
    id: string;
    fileName: string;
    content: string;
    analysis?: ResumeAnalysis;
  }
  
  export interface ResumeAnalysis {
    overallScore: number;
    companyScores: CompanyScore[];
    improvements: ImprovementSuggestion[];
    keywordMatches: KeywordMatch[];
  }
  
  export interface CompanyScore {
    company: string;
    score: number;
    strengths: string[];
    weaknesses: string[];
  }
  
  export interface ImprovementSuggestion {
    section: string;
    suggestions: string[];
    priority: 'high' | 'medium' | 'low';
  }
  
  export interface KeywordMatch {
    category: string;
    matched: string[];
    missing: string[];
    score: number;
  }
  
  export interface Template {
    id: string;
    name: string;
    preview: string;
    category: 'professional' | 'creative' | 'simple' | 'modern';
  }