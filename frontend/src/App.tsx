import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/layout/Navigation';
import Features from './components/features/Features';
import TemplateSelector from './components/resume/TemplateSelector';
import ResumeUpload from './components/resume/ResumeUpload';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Resume } from './types';

function App() {
  const [uploadedResume, setUploadedResume] = useState<Resume | null>(null);

  const handleUploadComplete = (resume: Resume) => {
    setUploadedResume(resume);
    // You can add navigation or other logic here
    console.log('Resume uploaded:', resume);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<ResumeUpload />} 
            />
            <Route path="/features" element={<Features />} />
            <Route path="/templates" element={<TemplateSelector />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/upload" 
              element={<ResumeUpload />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;