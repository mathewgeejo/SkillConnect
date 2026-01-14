import api from '../lib/axios';

// Job Recommendations
export const getJobRecommendations = async (workerId) => {
  const { data } = await api.post('/ai/recommendations/jobs', { workerId });
  return data;
};

// Worker Recommendations
export const getWorkerRecommendations = async (jobId, maxResults = 10) => {
  const { data } = await api.post('/ai/recommendations/workers', {
    jobId,
    maxResults
  });
  return data;
};

// Skill Gap Analysis
export const analyzeSkillGap = async (currentSkills, targetProfession) => {
  const { data } = await api.post('/ai/skills/gap-analysis', {
    currentSkills,
    targetProfession
  });
  return data;
};

// Skill Recommendations
export const getSkillRecommendations = async (profession, currentSkills = []) => {
  const { data } = await api.post('/ai/skills/recommendations', {
    profession,
    currentSkills
  });
  return data;
};

// Text Enhancement
export const enhanceText = async (text, type = 'jobDescription') => {
  const { data } = await api.post('/ai/enhance', {
    text,
    type
  });
  return data;
};

// Search Enhancement
export const enhanceSearch = async (query, type = 'job') => {
  const { data } = await api.post('/ai/search/enhance', {
    query,
    type
  });
  return data;
};

// Interview Questions
export const generateInterviewQuestions = async (jobTitle, skills, experienceLevel = 'mid') => {
  const { data } = await api.post('/ai/interview/questions', {
    jobTitle,
    skills,
    experienceLevel
  });
  return data;
};

// Salary Estimation
export const estimateSalary = async (profession, skills, experience, location = 'Kerala') => {
  const { data } = await api.post('/ai/salary/estimate', {
    profession,
    skills,
    experience,
    location
  });
  return data;
};

// Chat with AI
export const chatWithAI = async (message, conversationId, role = 'worker', context = {}) => {
  const { data } = await api.post('/ai/chat', {
    message,
    conversationId,
    role,
    context
  });
  return data;
};

// Clear conversation
export const clearConversation = async (conversationId) => {
  const { data } = await api.delete(`/ai/chat/${conversationId}`);
  return data;
};

// Get AI service health
export const getAIHealth = async () => {
  const { data } = await api.get('/ai/health');
  return data;
};

export default {
  getJobRecommendations,
  getWorkerRecommendations,
  analyzeSkillGap,
  getSkillRecommendations,
  enhanceText,
  enhanceSearch,
  generateInterviewQuestions,
  estimateSalary,
  chatWithAI,
  clearConversation,
  getAIHealth
};
