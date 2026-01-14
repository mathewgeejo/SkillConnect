import Groq from 'groq-sdk';

class AIService {
  constructor() {
    this.client = null;
    this.conversationCache = new Map();
    this.maxCacheSize = 1000;
    this.maxHistoryLength = 20;
  }

  getClient() {
    if (!this.client) {
      if (!process.env.GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY is not configured');
      }
      this.client = new Groq({
        apiKey: process.env.GROQ_API_KEY
      });
    }
    return this.client;
  }

  async generateCompletion(messages, options = {}) {
    const groq = this.getClient();
    
    const defaultOptions = {
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    };

    const completion = await groq.chat.completions.create({
      messages,
      ...defaultOptions,
      ...options
    });

    return completion.choices[0]?.message?.content || '';
  }

  // Job Recommendation System
  async recommendJobsForWorker(workerProfile) {
    const { skills, profession, experience, location, preferences } = workerProfile;

    const prompt = `As an AI career advisor for skilled workers in Kerala, India, analyze this worker profile and recommend the top 5 most suitable job opportunities:

Worker Profile:
- Profession: ${profession}
- Skills: ${Array.isArray(skills) ? skills.join(', ') : skills}
- Experience: ${experience || 0} years
- Location: ${location?.city || 'Kerala'}
- Preferred Job Types: ${preferences?.jobTypes?.join(', ') || 'Any'}
- Hourly Rate: ₹${workerProfile.hourlyRate || 'Not specified'}

Provide recommendations in this exact JSON format:
{
  "recommendations": [
    {
      "jobType": "specific job category",
      "reasoning": "why this is a good match",
      "skillMatch": "percentage (0-100)",
      "marketDemand": "high/medium/low",
      "estimatedSalary": "salary range in INR"
    }
  ],
  "skillGaps": ["skill1", "skill2"],
  "careerAdvice": "brief career development advice"
}`;

    const response = await this.generateCompletion([
      {
        role: 'system',
        content: 'You are an expert career advisor specializing in skilled labor markets in Kerala, India. Provide data-driven, actionable recommendations in valid JSON format only.'
      },
      {
        role: 'user',
        content: prompt
      }
    ], {
      temperature: 0.5,
      max_tokens: 1500
    });

    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      // Fallback response
      return {
        recommendations: [],
        skillGaps: [],
        careerAdvice: response
      };
    }
  }

  // Worker Recommendation for Jobs
  async recommendWorkersForJob(jobDetails, availableWorkers = []) {
    const { title, description, category, skills, requirements, location } = jobDetails;

    const workersInfo = availableWorkers.slice(0, 20).map((w, idx) => 
      `Worker ${idx + 1}: ${w.profession}, Skills: ${w.skills?.join(', ') || 'N/A'}, Experience: ${w.experience || 0}y, Rating: ${w.rating?.average || 'N/A'}`
    ).join('\n');

    const prompt = `As a recruitment AI, match workers to this job posting and rank the top candidates:

Job Details:
- Title: ${title}
- Category: ${category}
- Required Skills: ${Array.isArray(skills) ? skills.join(', ') : skills}
- Description: ${description}
- Location: ${location?.city || 'Kerala'}
- Experience Required: ${requirements?.experience || 0} years

Available Workers:
${workersInfo || 'No workers provided - provide general matching criteria'}

Provide analysis in this JSON format:
{
  "topMatches": [
    {
      "workerIndex": 0,
      "matchScore": "0-100",
      "strengths": ["strength1", "strength2"],
      "concerns": ["concern1"],
      "recommendation": "hire/interview/pass"
    }
  ],
  "hiringAdvice": "general advice for this position"
}`;

    const response = await this.generateCompletion([
      {
        role: 'system',
        content: 'You are an expert recruiter specializing in skilled labor hiring in India. Provide objective, fair assessments in valid JSON format.'
      },
      {
        role: 'user',
        content: prompt
      }
    ], {
      temperature: 0.3,
      max_tokens: 2000
    });

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      return {
        topMatches: [],
        hiringAdvice: response
      };
    }
  }

  // Skill Gap Analysis
  async analyzeSkillGap(currentSkills, targetProfession) {
    const prompt = `Analyze the skill gap for a worker wanting to excel in ${targetProfession}.

Current Skills: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills}
Target Profession: ${targetProfession}

Provide a detailed skill gap analysis in this JSON format:
{
  "missingSkills": [
    {
      "skill": "skill name",
      "priority": "high/medium/low",
      "learningTime": "estimated time to learn",
      "resources": ["learning resource suggestions"]
    }
  ],
  "strengthSkills": ["skills they already have"],
  "developmentPlan": "step-by-step career development plan",
  "marketOutlook": "job market outlook for this profession"
}`;

    const response = await this.generateCompletion([
      {
        role: 'system',
        content: 'You are a career development expert specializing in vocational training and skill development in India.'
      },
      {
        role: 'user',
        content: prompt
      }
    ], {
      temperature: 0.4,
      max_tokens: 1500
    });

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      return {
        missingSkills: [],
        strengthSkills: [],
        developmentPlan: response,
        marketOutlook: ''
      };
    }
  }

  // Text Enhancement
  async enhanceText(text, type = 'description', context = {}) {
    const prompts = {
      jobDescription: `Enhance this job description to be more professional, clear, and attractive to skilled workers. Keep it concise (150-200 words) and highlight key requirements and benefits:\n\n"${text}"`,
      
      workerBio: `Improve this worker's professional bio to be more compelling and highlight their expertise. Keep it professional and under 150 words:\n\n"${text}"`,
      
      jobTitle: `Make this job title more professional, clear, and searchable (one line only):\n\n"${text}"`,
      
      coverLetter: `Enhance this cover letter/application message to be more professional and persuasive (200 words max):\n\n"${text}"`,
      
      companyDescription: `Improve this company description to be more professional and attractive to job seekers (150 words max):\n\n"${text}"`
    };

    const selectedPrompt = prompts[type] || prompts.jobDescription;

    const response = await this.generateCompletion([
      {
        role: 'system',
        content: 'You are a professional content writer specializing in job market communications. Provide clear, concise, and professional content.'
      },
      {
        role: 'user',
        content: selectedPrompt
      }
    ], {
      temperature: 0.7,
      max_tokens: 500
    });

    return response.trim();
  }

  // Smart Search Query Enhancement
  async enhanceSearchQuery(query, searchType = 'job') {
    const prompt = searchType === 'job' 
      ? `A user is searching for jobs with this query: "${query}". Suggest 3 alternative search terms or categories that might help them find better matches. Provide as a simple JSON array of strings.`
      : `A user is searching for workers with this query: "${query}". Suggest 3 alternative search terms or skills that might help them find better matches. Provide as a simple JSON array of strings.`;

    const response = await this.generateCompletion([
      {
        role: 'system',
        content: 'You are a search optimization expert. Provide suggestions in valid JSON array format only.'
      },
      {
        role: 'user',
        content: prompt
      }
    ], {
      temperature: 0.6,
      max_tokens: 200
    });

    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  // Interview Questions Generator
  async generateInterviewQuestions(jobTitle, skills, experienceLevel = 'mid') {
    const prompt = `Generate 5 relevant interview questions for a ${jobTitle} position requiring these skills: ${Array.isArray(skills) ? skills.join(', ') : skills}. Experience level: ${experienceLevel}.

Provide in JSON format:
{
  "questions": [
    {
      "question": "the question",
      "purpose": "what this question assesses",
      "idealAnswerHint": "brief hint about good answers"
    }
  ]
}`;

    const response = await this.generateCompletion([
      {
        role: 'system',
        content: 'You are an HR expert specializing in skilled labor recruitment.'
      },
      {
        role: 'user',
        content: prompt
      }
    ], {
      temperature: 0.6,
      max_tokens: 1000
    });

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      return { questions: [] };
    }
  }

  // Salary Estimation
  async estimateSalary(profession, skills, experience, location) {
    const prompt = `Estimate the fair salary range for a ${profession} in ${location}, Kerala with ${experience} years of experience and these skills: ${Array.isArray(skills) ? skills.join(', ') : skills}.

Provide estimation in JSON format:
{
  "hourlyRate": { "min": 0, "max": 0, "currency": "INR" },
  "monthlyRate": { "min": 0, "max": 0, "currency": "INR" },
  "factors": ["factor1", "factor2"],
  "marketInsights": "brief market insights"
}`;

    const response = await this.generateCompletion([
      {
        role: 'system',
        content: 'You are a compensation analyst specializing in the Indian skilled labor market. Provide realistic estimates in valid JSON format.'
      },
      {
        role: 'user',
        content: prompt
      }
    ], {
      temperature: 0.3,
      max_tokens: 500
    });

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Invalid JSON response');
    } catch (error) {
      return {
        hourlyRate: { min: 0, max: 0, currency: 'INR' },
        monthlyRate: { min: 0, max: 0, currency: 'INR' },
        factors: [],
        marketInsights: response
      };
    }
  }

  // Conversational AI with context
  async chat(message, conversationId, userRole = 'worker', systemContext = {}) {
    // Get or create conversation history
    let history = this.conversationCache.get(conversationId) || [];

    // Set system context based on role
    const systemMessages = {
      worker: 'You are a helpful AI assistant for skilled workers on SkillConnect Kerala platform. Help them find jobs, improve their profiles, understand market rates, and develop their careers. Be encouraging, professional, and provide actionable advice.',
      
      employer: 'You are a helpful AI assistant for employers on SkillConnect Kerala platform. Help them find qualified workers, write better job postings, understand market rates, and make hiring decisions. Be professional and data-driven.',
      
      admin: 'You are a helpful AI assistant for platform administrators. Help with platform management, user support, and data insights. Be concise and efficient.',
      
      general: 'You are a helpful AI assistant for SkillConnect Kerala, a platform connecting skilled workers with employers. Provide helpful, professional guidance.'
    };

    // Initialize conversation with system message
    if (history.length === 0) {
      history.push({
        role: 'system',
        content: systemMessages[userRole] || systemMessages.general
      });
    }

    // Add user message
    history.push({
      role: 'user',
      content: message
    });

    // Generate response
    const aiResponse = await this.generateCompletion(history, {
      temperature: 0.7,
      max_tokens: 500
    });

    // Add assistant response
    history.push({
      role: 'assistant',
      content: aiResponse
    });

    // Trim history if too long (keep system message + last N messages)
    if (history.length > this.maxHistoryLength) {
      history = [history[0], ...history.slice(-(this.maxHistoryLength - 1))];
    }

    // Update cache with size limit
    if (this.conversationCache.size >= this.maxCacheSize) {
      // Remove oldest conversation
      const firstKey = this.conversationCache.keys().next().value;
      this.conversationCache.delete(firstKey);
    }
    this.conversationCache.set(conversationId, history);

    return aiResponse;
  }

  clearConversation(conversationId) {
    this.conversationCache.delete(conversationId);
  }

  clearAllConversations() {
    this.conversationCache.clear();
  }
}

// Export singleton instance
const aiService = new AIService();
export default aiService;
