import React, { useState } from 'react';
import { Search, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface JobTemplate {
  id: string;
  title: string;
  description: string;
  structure: {
    sections: string[];
    recommendations: string[];
  };
  keywords: string[];
}

const jobTemplates: JobTemplate[] = [
  {
    id: 'software-dev',
    title: 'Software Developer',
    description: 'Perfect for Software Engineers, Full-stack Developers, and Backend Developers',
    structure: {
      sections: [
        'Technical Skills',
        'Programming Languages',
        'Projects',
        'Work Experience',
        'Education'
      ],
      recommendations: [
        'Highlight technical projects with measurable impacts',
        'List programming languages by proficiency',
        'Include GitHub/portfolio links',
        'Emphasize problem-solving achievements'
      ]
    },
    keywords: ['algorithms', 'full-stack', 'API', 'databases', 'cloud']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designer',
    description: 'Ideal for UI Designers, UX Researchers, and Product Designers',
    structure: {
      sections: [
        'Design Skills',
        'Tools & Software',
        'Portfolio Projects',
        'User Research',
        'Work Experience'
      ],
      recommendations: [
        'Include link to portfolio',
        'Showcase user-centered design process',
        'Highlight user research methods',
        'Show measurable UX improvements'
      ]
    },
    keywords: ['user experience', 'wireframes', 'prototyping', 'Figma', 'user research']
  },
  {
    id: 'data-science',
    title: 'Data Scientist',
    description: 'Suitable for Data Scientists, Data Analysts, and ML Engineers',
    structure: {
      sections: [
        'Technical Skills',
        'Data Analysis Tools',
        'Machine Learning Projects',
        'Research Experience',
        'Education'
      ],
      recommendations: [
        'Highlight data-driven results',
        'Showcase statistical analysis skills',
        'Include research publications',
        'Emphasize machine learning projects'
      ]
    },
    keywords: ['machine learning', 'Python', 'data analysis', 'statistics', 'SQL']
  }
];

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = jobTemplates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resume Templates</h1>
        <p className="text-gray-600 mb-6">
          Choose a template tailored to your career path for better job-specific recommendations
        </p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{template.title}</CardTitle>
                <Briefcase className="text-blue-500" />
              </div>
              <p className="text-sm text-gray-600 mt-2">{template.description}</p>
            </CardHeader>

            {selectedTemplate === template.id && (
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Recommended Sections:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {template.structure.sections.map((section) => (
                      <li key={section}>{section}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Recommendations:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {template.structure.recommendations.map((rec) => (
                      <li key={rec}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Important Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;