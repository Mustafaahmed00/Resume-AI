import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, X, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import api from '../../services/api';
import type { Resume } from '../../types';

interface ResumeUploadProps {
  onUploadSuccess?: (resume: Resume) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const handleUpload = async (fileToUpload: File) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('resume', fileToUpload);
  
    console.log('Attempting to upload file:', {
      name: fileToUpload.name,
      size: fileToUpload.size,
      type: fileToUpload.type
    });
  
    try {
      // Log request details
      console.log('Upload request configuration:', {
        url: '/resume/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      const response = await api.post<{ resume: Resume }>('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });
  
      console.log('Upload response:', response.data);
      
      // Call onUploadSuccess if provided
      if (onUploadSuccess) {
        onUploadSuccess(response.data.resume);
      }
      
      navigate(`/analysis/${response.data.resume.id}`);
    } catch (err: any) {
      console.error('Detailed upload error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Failed to upload resume. Please try again.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Your Resume</h1>
        <p className="mt-2 text-gray-600">We'll analyze your resume and provide personalized feedback</p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-300' : ''}`}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            <p className="text-gray-600">Uploading... {uploadProgress}%</p>
          </div>
        ) : file ? (
          <div className="flex items-center justify-center space-x-4">
            <FileText className="w-8 h-8 text-blue-500" />
            <span className="text-gray-700">{file.name}</span>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <FileText className="w-16 h-16 mx-auto text-gray-400" />
            <div>
              <p className="text-gray-600">
                {isDragActive ? 'Drop your resume here' : 'Drag and drop your resume, or click to select'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Supports PDF, DOC, and DOCX files</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;