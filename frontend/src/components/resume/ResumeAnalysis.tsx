import { useState } from 'react'
import { ChevronUp, ChevronDown, Award, AlertCircle, CheckCircle } from 'lucide-react'
import type { Resume, CompanyScore } from '../../types'

interface ResumeAnalysisProps {
  resume: Resume;
}

const ResumeAnalysis = ({ resume }: ResumeAnalysisProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'companies' | 'improvements'>('overview')

  // Mock data - replace with actual API data later
  const mockAnalysis = {
    overallScore: 85,
    companyScores: [
      {
        company: 'Google',
        score: 82,
        strengths: ['Technical skills', 'Project achievements'],
        weaknesses: ['Leadership examples', 'Quantified results']
      },
      {
        company: 'Microsoft',
        score: 88,
        strengths: ['Clear experience', 'Technical depth'],
        weaknesses: ['More specific achievements needed']
      }
    ],
    improvements: [
      {
        section: 'Work Experience',
        suggestions: ['Add more quantified results', 'Use stronger action verbs'],
        priority: 'high'
      },
      {
        section: 'Skills',
        suggestions: ['Group similar skills together', 'Add proficiency levels'],
        priority: 'medium'
      }
    ]
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Resume Analysis</h2>
        
        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-6">
          <button
            className={`pb-2 px-1 ${
              activeTab === 'overview'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === 'companies'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('companies')}
          >
            Company Match
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === 'improvements'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('improvements')}
          >
            Improvements
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-lg">Overall Score</h3>
                <p className="text-gray-600">Based on industry standards</p>
              </div>
              <div className="text-3xl font-bold text-primary-600">
                {mockAnalysis.overallScore}%
              </div>
            </div>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="space-y-6">
            {mockAnalysis.companyScores.map((score: CompanyScore) => (
              <div key={score.company} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">{score.company}</h3>
                  <span className="text-2xl font-bold text-primary-600">
                    {score.score}%
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {score.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-600 mb-2">Areas to Improve</h4>
                    <ul className="space-y-1">
                      {score.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'improvements' && (
          <div className="space-y-6">
            {mockAnalysis.improvements.map((improvement, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{improvement.section}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                    improvement.priority === 'high' 
                      ? 'bg-red-100 text-red-700'
                      : improvement.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {improvement.priority} priority
                  </span>
                </div>
                <ul className="space-y-2">
                  {improvement.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <Award className="w-4 h-4 mr-2 mt-1 text-primary-500" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeAnalysis