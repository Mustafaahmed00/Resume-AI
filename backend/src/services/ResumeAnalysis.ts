import { readFileSync } from 'fs';
import pdfParse from 'pdf-parse';
import natural from 'natural';
const tokenizer = new natural.WordTokenizer();

import { companyRequirements, technicalSkills, softSkills } from '../utils/skillsData';

interface AnalysisResult {
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
}

export class ResumeAnalysisService {
  private static instance: ResumeAnalysisService;

  private constructor() {}

  public static getInstance(): ResumeAnalysisService {
    if (!ResumeAnalysisService.instance) {
      ResumeAnalysisService.instance = new ResumeAnalysisService();
    }
    return ResumeAnalysisService.instance;
  }

  async parsePDF(filePath: string): Promise<string> {
    try {
      const dataBuffer = readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF');
    }
  }

  private extractSkills(text: string): string[] {
    const lowerText = text.toLowerCase();
    const skills = new Set<string>();

    // Check for technical skills
    for (const category of Object.values(technicalSkills)) {
      for (const skill of category) {
        if (lowerText.includes(skill.toLowerCase())) {
          skills.add(skill);
        }
      }
    }

    // Check for soft skills
    for (const skill of softSkills) {
      if (lowerText.includes(skill.toLowerCase())) {
        skills.add(skill);
      }
    }

    return Array.from(skills);
  }

  private analyzeSectionImprovements(section: string, content: string): {
    suggestions: string[];
    priority: 'high' | 'medium' | 'low';
  } {
    const suggestions: string[] = [];
    let priority: 'high' | 'medium' | 'low' = 'low';

    const sentences = content.split(/[.!?]+/);
    
    // Analyze bullet points
    if (section === 'experience' || section === 'projects') {
      const hasQuantifiableResults = sentences.some(s => 
        /\d+%|\d+x|\$\d+|\d+ [a-zA-Z]+ per [a-zA-Z]+/.test(s)
      );
      
      if (!hasQuantifiableResults) {
        suggestions.push('Add quantifiable results to demonstrate impact');
        priority = 'high';
      }

      const hasActionVerbs = sentences.some(s => 
        /^(Led|Developed|Created|Implemented|Managed|Improved|Increased|Decreased)/.test(s.trim())
      );

      if (!hasActionVerbs) {
        suggestions.push('Start bullet points with strong action verbs');
        priority = 'high';
      }
    }

    // Analyze skills section
    if (section === 'skills') {
      const skills = this.extractSkills(content);
      if (skills.length < 10) {
        suggestions.push('Add more relevant technical and soft skills');
        priority = 'medium';
      }
    }

    return { suggestions, priority };
  }

  private calculateCompanyMatch(text: string, company: 'Google' | 'Microsoft' | 'Amazon'): {
    score: number;
    strengths: string[];
    weaknesses: string[];
  } {
    const requirements = companyRequirements[company];
    if (!requirements) {
      throw new Error(`No requirements found for company: ${company}`);
    }
  
    const extractedSkills = this.extractSkills(text);
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    let matchScore = 0;
  
    // Check must-have skills
    const mustHaveMatches = requirements.mustHave.filter(skill => 
      extractedSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    
    matchScore += (mustHaveMatches.length / requirements.mustHave.length) * 60;
    
    if (mustHaveMatches.length > 0) {
      strengths.push(`Matches ${mustHaveMatches.length} essential requirements`);
    }
    
    const missingMustHave = requirements.mustHave.filter(skill => 
      !extractedSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (missingMustHave.length > 0) {
      weaknesses.push(`Missing key requirements: ${missingMustHave.join(', ')}`);
    }
  
    // Check preferred skills
    const preferredMatches = requirements.preferred.filter(skill => 
      extractedSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    
    matchScore += (preferredMatches.length / requirements.preferred.length) * 40;
    
    if (preferredMatches.length > 0) {
      strengths.push(`Shows ${preferredMatches.length} preferred skills`);
    }
  
    // Check culture fit
    const cultureFitCount = requirements.culture.filter(trait => 
      text.toLowerCase().includes(trait.toLowerCase())
    ).length;
    
    matchScore = Math.min(100, matchScore + cultureFitCount * 5);
  
    return {
      score: Math.round(matchScore),
      strengths,
      weaknesses
    };
  }

  async analyzeResume(filePath: string): Promise<AnalysisResult> {
    try {
      const text = await this.parsePDF(filePath);
      
      // Split into sections (simplified)
      const sections = {
        experience: text.slice(text.toLowerCase().indexOf('experience')),
        skills: text.slice(text.toLowerCase().indexOf('skills')),
        projects: text.slice(text.toLowerCase().indexOf('projects'))
      };

      // Analyze each section
      const improvements = Object.entries(sections).map(([section, content]) => {
        const { suggestions, priority } = this.analyzeSectionImprovements(section, content);
        return {
          section,
          suggestions,
          priority
        };
      }).filter(imp => imp.suggestions.length > 0);

      // Calculate company-specific scores
      const companyScores = Object.keys(companyRequirements).map(company => {
        const { score, strengths, weaknesses } = this.calculateCompanyMatch(text, company as 'Google' | 'Microsoft' | 'Amazon');
        return {
          company,
          score,
          strengths,
          weaknesses
        };
      });

      // Calculate overall score
      const overallScore = Math.round(
        companyScores.reduce((acc, curr) => acc + curr.score, 0) / companyScores.length
      );

      return {
        overallScore,
        companyScores,
        improvements
      };
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze resume');
    }
  }
}