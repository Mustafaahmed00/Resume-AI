import React from 'react';
import { 
  Target, 
  List, 
  BarChart2, 
  Book, 
  FileText,
  Lightbulb,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: 'ATS Score Analysis',
      description: 'Get detailed insights on how well your resume performs against ATS systems. Includes keyword optimization and format compatibility checks.'
    },
    {
      icon: <List className="w-8 h-8 text-green-500" />,
      title: 'Smart Bullet Points Generator',
      description: 'Transform your experience into powerful bullet points using action verbs and quantifiable achievements.'
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-purple-500" />,
      title: 'Skills Gap Analysis',
      description: 'Compare your skills against job requirements and get recommendations for skills you should develop.'
    },
    {
      icon: <Book className="w-8 h-8 text-red-500" />,
      title: 'Industry Keywords',
      description: 'Access a comprehensive database of industry-specific keywords and phrases to enhance your resume.'
    },
    {
      icon: <FileText className="w-8 h-8 text-indigo-500" />,
      title: 'Section Suggestions',
      description: 'Get personalized suggestions for sections to include based on your experience level and industry.'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: 'Project Showcasing',
      description: 'Learn how to effectively present your academic and personal projects to demonstrate practical skills.'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-teal-500" />,
      title: 'Educational Highlighting',
      description: 'Tips for highlighting relevant coursework, academic achievements, and extracurricular activities.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: 'Career Path Insights',
      description: 'Get insights into career progression and skill requirements for your chosen field.'
    }
  ];

  const toolsForStudents = [
    {
      title: 'Academic Project Optimizer',
      description: 'Learn how to present class projects professionally',
      tips: [
        'Focus on technical skills used',
        'Highlight team collaboration',
        'Quantify project outcomes'
      ]
    },
    {
      title: 'Internship Experience Enhancer',
      description: 'Make the most of your internship experience',
      tips: [
        'Emphasize learning outcomes',
        'Showcase practical applications',
        'Highlight mentor relationships'
      ]
    },
    {
      title: 'Extracurricular Activities Guide',
      description: 'Leverage your non-academic experiences',
      tips: [
        'Connect activities to job skills',
        'Demonstrate leadership',
        'Show time management'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Resume Building Features</h1>
        <p className="text-xl text-gray-600">
          Comprehensive tools to help you create a standout resume
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Student-Specific Tools */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Special Tools for Students
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {toolsForStudents.map((tool, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <ul className="space-y-2">
                {tool.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ATS Score Explanation */}
      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Understanding ATS Scoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Keyword Optimization</h3>
            <p className="text-gray-700">
              Our system analyzes your resume against job descriptions to ensure you're using the right industry-specific keywords.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Format Compatibility</h3>
            <p className="text-gray-700">
              We check if your resume format is ATS-friendly and suggest improvements for better parsing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Score Improvement Tips</h3>
            <p className="text-gray-700">
              Get actionable suggestions to improve your ATS score and increase your chances of getting noticed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;