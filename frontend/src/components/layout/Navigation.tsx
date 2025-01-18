import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">ResumeAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              to="/features"
              className={`${
                location.pathname === '/features'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              } px-1 py-2 text-sm font-medium`}
            >
              Features
            </Link>
            <Link
              to="/templates"
              className={`${
                location.pathname === '/templates'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              } px-1 py-2 text-sm font-medium`}
            >
              Templates
            </Link>
            <Link
              to="/upload"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;