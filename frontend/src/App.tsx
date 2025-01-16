import { useState } from 'react'
import Header from './components/layout/Header'
import ResumeUpload from './components/resume/ResumeUpload'
import ResumeAnalysis from './components/resume//ResumeAnalysis'
import { Resume } from './types'

function App() {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!currentResume ? (
          <ResumeUpload onUploadComplete={setCurrentResume} />
        ) : (
          <ResumeAnalysis resume={currentResume} />
        )}
      </main>
    </div>
  )
}

export default App
