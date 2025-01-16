import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, AlertCircle } from 'lucide-react'
import { Resume } from '../../types'

interface ResumeUploadProps {
  onUploadComplete: (resume: Resume) => void
}

const ResumeUpload = ({ onUploadComplete }: ResumeUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockResume: Resume = {
        id: '1',
        fileName: file.name,
        content: 'Mock content',
      }
      
      onUploadComplete(mockResume)
    } catch (err) {
      setError('Failed to upload resume. Please try again.')
    } finally {
      setUploading(false)
    }
  }, [onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Resume
        </h2>
        <p className="text-gray-600">
          We'll analyze your resume and provide personalized feedback
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="space-y-4">
            <div className="animate-spin mx-auto">
              <Upload className="h-10 w-10 text-primary-500" />
            </div>
            <p className="text-gray-600">Uploading your resume...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <File className="h-10 w-10 text-gray-400 mx-auto" />
            <div>
              <p className="text-gray-600">
                {isDragActive
                  ? 'Drop your resume here'
                  : 'Drag and drop your resume, or click to select'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, DOC, and DOCX files
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center space-x-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default ResumeUpload