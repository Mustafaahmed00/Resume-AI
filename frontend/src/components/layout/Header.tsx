import { FileText } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">ResumeAI</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Templates
            </a>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header