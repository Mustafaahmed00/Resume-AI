export const technicalSkills = {
    programming: [
      'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'Swift',
      'TypeScript', 'PHP', 'Kotlin', 'Rust', 'C#'
    ],
    frontend: [
      'React', 'Angular', 'Vue.js', 'HTML5', 'CSS3', 'SASS',
      'Redux', 'Webpack', 'Next.js', 'Gatsby'
    ],
    backend: [
      'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
      'Laravel', 'Ruby on Rails', 'GraphQL', 'REST APIs'
    ],
    database: [
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
      'DynamoDB', 'Cassandra', 'Oracle'
    ],
    cloud: [
      'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
      'Serverless', 'CI/CD', 'Jenkins'
    ],
    tools: [
      'Git', 'JIRA', 'Confluence', 'Slack', 'Postman',
      'VS Code', 'IntelliJ', 'Eclipse'
    ]
  };
  
  export const softSkills = [
    'Leadership',
    'Communication',
    'Problem Solving',
    'Team Collaboration',
    'Time Management',
    'Critical Thinking',
    'Adaptability',
    'Project Management',
    'Mentoring',
    'Conflict Resolution',
    'Decision Making',
    'Creativity',
    'Attention to Detail',
    'Strategic Planning',
    'Analytical Skills'
  ];
  
  type CompanyName = 'Google' | 'Microsoft' | 'Amazon';
  
  interface CompanyRequirement {
    mustHave: string[];
    preferred: string[];
    culture: string[];
  }
  
  export const companyRequirements: Record<CompanyName, CompanyRequirement> = {
    'Google': {
      mustHave: [
        'Data Structures',
        'Algorithms',
        'System Design',
        'Problem Solving'
      ],
      preferred: [
        'Machine Learning',
        'Distributed Systems',
        'Cloud Computing',
        'Open Source'
      ],
      culture: [
        'Innovation',
        'Technical Leadership',
        'Collaboration',
        'Impact'
      ]
    },
    'Microsoft': {
      mustHave: [
        'Software Development',
        'Code Quality',
        'Testing',
        'Architecture'
      ],
      preferred: [
        'Azure',
        '.NET',
        'Cloud Services',
        'Enterprise Solutions'
      ],
      culture: [
        'Growth Mindset',
        'Customer Focus',
        'Diversity',
        'Learning'
      ]
    },
    'Amazon': {
      mustHave: [
        'Scalable Systems',
        'APIs',
        'Data Analysis',
        'Performance Optimization'
      ],
      preferred: [
        'AWS',
        'Microservices',
        'DevOps',
        'Big Data'
      ],
      culture: [
        'Customer Obsession',
        'Ownership',
        'Results',
        'Decision Making'
      ]
    }
  };