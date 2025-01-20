import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/layout/Navigation';
import Features from './components/features/Features';
import TemplateSelector from './components/resume/TemplateSelector';
import ResumeUpload from './components/resume/ResumeUpload';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResumeAnalysis from './components/resume/ResumeAnalysis';
import type { Resume, ResumeCandidate } from './types';

function App() {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route
              path="/"
              element={<ResumeUpload onUploadSuccess={setCurrentResume} />}
            />
            <Route
              path="/upload"
              element={<ResumeUpload onUploadSuccess={setCurrentResume} />}
            />
            <Route path="/features" element={<Features />} />
            <Route path="/templates" element={<TemplateSelector />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
  path="/analysis/:resumeId"
  element={
    currentResume ? (
      <ResumeAnalysis
        resume={currentResume}
        candidate={{ name: currentResume.name }}
      />
    ) : (
      <Navigate to="/upload" replace />
    )
  }
/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;