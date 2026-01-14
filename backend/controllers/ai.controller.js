import aiService from '../services/ai.service.js';
import Worker from '../models/Worker.model.js';
import Job from '../models/Job.model.js';

// @desc    Get AI job recommendations for worker
// @route   POST /api/ai/recommendations/jobs
// @access  Public
export const getJobRecommendations = async (req, res, next) => {
  try {
    const { workerId } = req.body;

    // Fetch worker profile
    const worker = await Worker.findById(workerId);
    
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker profile not found'
      });
    }

    // Generate AI recommendations
    const recommendations = await aiService.recommendJobsForWorker({
      skills: worker.skills,
      profession: worker.profession,
      experience: worker.experience,
      location: worker.location,
      preferences: worker.preferences,
      hourlyRate: worker.hourlyRate
    });

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI worker recommendations for job
// @route   POST /api/ai/recommendations/workers
// @access  Public
export const getWorkerRecommendations = async (req, res, next) => {
  try {
    const { jobId, maxResults = 10 } = req.body;

    // Fetch job details
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Find workers with matching skills and category
    const matchingWorkers = await Worker.find({
      profession: new RegExp(job.category, 'i'),
      isActive: true,
      'availability.status': 'available'
    })
    .select('profession skills experience rating location hourlyRate')
    .limit(50)
    .lean();

    // Get AI recommendations
    const recommendations = await aiService.recommendWorkersForJob({
      title: job.title,
      description: job.description,
      category: job.category,
      skills: job.skills,
      requirements: job.requirements,
      location: job.location
    }, matchingWorkers);

    // Match AI recommendations with actual worker data
    const enrichedMatches = recommendations.topMatches
      .slice(0, maxResults)
      .map(match => ({
        ...match,
        worker: matchingWorkers[match.workerIndex]
      }))
      .filter(match => match.worker); // Filter out invalid indices

    res.status(200).json({
      success: true,
      data: {
        matches: enrichedMatches,
        hiringAdvice: recommendations.hiringAdvice,
        totalAnalyzed: matchingWorkers.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze skill gap
// @route   POST /api/ai/skills/gap-analysis
// @access  Public
export const analyzeSkillGap = async (req, res, next) => {
  try {
    const { currentSkills, targetProfession } = req.body;

    if (!currentSkills || !targetProfession) {
      return res.status(400).json({
        success: false,
        message: 'Current skills and target profession are required'
      });
    }

    const analysis = await aiService.analyzeSkillGap(currentSkills, targetProfession);

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get skill recommendations
// @route   POST /api/ai/skills/recommendations
// @access  Public
export const getSkillRecommendations = async (req, res, next) => {
  try {
    const { profession, currentSkills = [] } = req.body;

    if (!profession) {
      return res.status(400).json({
        success: false,
        message: 'Profession is required'
      });
    }

    const analysis = await aiService.analyzeSkillGap(currentSkills, profession);

    res.status(200).json({
      success: true,
      data: {
        recommendedSkills: analysis.missingSkills,
        existingStrengths: analysis.strengthSkills,
        developmentPlan: analysis.developmentPlan
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enhance text with AI
// @route   POST /api/ai/enhance
// @access  Public
export const enhanceText = async (req, res, next) => {
  try {
    const { text, type = 'jobDescription' } = req.body;

    if (!text || text.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Text must be at least 10 characters long'
      });
    }

    const enhanced = await aiService.enhanceText(text, type);

    res.status(200).json({
      success: true,
      data: {
        original: text,
        enhanced: enhanced
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enhance search query
// @route   POST /api/ai/search/enhance
// @access  Public
export const enhanceSearch = async (req, res, next) => {
  try {
    const { query, type = 'job' } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const suggestions = await aiService.enhanceSearchQuery(query, type);

    res.status(200).json({
      success: true,
      data: {
        originalQuery: query,
        suggestions: suggestions
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate interview questions
// @route   POST /api/ai/interview/questions
// @access  Public
export const generateInterviewQuestions = async (req, res, next) => {
  try {
    const { jobTitle, skills, experienceLevel = 'mid' } = req.body;

    if (!jobTitle || !skills) {
      return res.status(400).json({
        success: false,
        message: 'Job title and skills are required'
      });
    }

    const questions = await aiService.generateInterviewQuestions(
      jobTitle,
      skills,
      experienceLevel
    );

    res.status(200).json({
      success: true,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Estimate salary
// @route   POST /api/ai/salary/estimate
// @access  Public
export const estimateSalary = async (req, res, next) => {
  try {
    const { profession, skills, experience = 0, location = 'Kerala' } = req.body;

    if (!profession) {
      return res.status(400).json({
        success: false,
        message: 'Profession is required'
      });
    }

    const estimation = await aiService.estimateSalary(
      profession,
      skills,
      experience,
      location
    );

    res.status(200).json({
      success: true,
      data: estimation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Chat with AI assistant
// @route   POST /api/ai/chat
// @access  Public
export const chat = async (req, res, next) => {
  try {
    const { message, conversationId, role = 'worker', context = {} } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const response = await aiService.chat(
      message,
      conversationId || `chat-${Date.now()}`,
      role,
      context
    );

    res.status(200).json({
      success: true,
      data: {
        message: response,
        conversationId: conversationId || `chat-${Date.now()}`
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear AI conversation
// @route   DELETE /api/ai/chat/:conversationId
// @access  Public
export const clearConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    
    aiService.clearConversation(conversationId);

    res.status(200).json({
      success: true,
      message: 'Conversation cleared successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI service health status
// @route   GET /api/ai/health
// @access  Public
export const getHealth = async (req, res, next) => {
  try {
    const isConfigured = !!process.env.GROQ_API_KEY;
    
    res.status(200).json({
      success: true,
      data: {
        configured: isConfigured,
        model: 'llama-3.3-70b-versatile',
        provider: 'Groq',
        features: [
          'Job Recommendations',
          'Worker Matching',
          'Skill Gap Analysis',
          'Text Enhancement',
          'Salary Estimation',
          'Interview Questions',
          'Conversational AI'
        ]
      }
    });
  } catch (error) {
    next(error);
  }
};
