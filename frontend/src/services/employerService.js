import api from '../lib/axios';

// Get employer by ID
export const getEmployer = async (id) => {
  const { data } = await api.get(`/employers/${id}`);
  return data;
};

// Update employer profile
export const updateEmployer = async (profileData) => {
  const { data } = await api.put('/employers/profile', profileData);
  return data;
};

// Get applications for a specific job
export const getJobApplications = async (jobId) => {
  const { data } = await api.get(`/jobs/${jobId}/applications`);
  return data;
};

// Update application status
export const updateApplicationStatus = async (jobId, applicationId, status) => {
  const { data } = await api.put(`/jobs/${jobId}/applications/${applicationId}`, { status });
  return data;
};
