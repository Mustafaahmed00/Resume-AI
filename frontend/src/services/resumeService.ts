import api from './api';

export const resumeService = {
  async uploadResume(file: File) {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getAnalysis(resumeId: string) {
    const response = await api.get(`/resume/analysis/${resumeId}`);
    return response.data;
  },

  async getUserResumes() {
    const response = await api.get('/resume/user');
    return response.data;
  },

  async deleteResume(resumeId: string) {
    const response = await api.delete(`/resume/${resumeId}`);
    return response.data;
  },
};