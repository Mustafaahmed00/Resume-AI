import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Features from './components/features/Features';
import TemplateSelector from './components/resume/TemplateSelector';
import ResumeUpload from './components/resume/ResumeUpload';
//import Login from './components/auth/Login';
//import Register from './components/auth/Register';
import { Resume } from './types';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<ResumeUpload onUploadComplete={function (resume: Resume): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="/features" element={<Features />} />
            <Route path="/templates" element={<TemplateSelector />} />
            <Route path="/upload" element={<ResumeUpload onUploadComplete={function (resume: Resume): void {
              throw new Error('Function not implemented.');
            } } />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;