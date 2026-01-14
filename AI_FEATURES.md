# AI Recommendation System - SkillConnect Kerala

## Overview

SkillConnect Kerala now includes a comprehensive AI-powered recommendation system powered by **Groq's Llama 3.3 70B** model. This system provides intelligent matching, personalized recommendations, and career development insights.

## 🚀 Features

### 1. **Job Recommendations for Workers**
- Analyzes worker profile (skills, experience, location, preferences)
- Recommends top 5 most suitable job opportunities
- Provides skill match percentage and market demand analysis
- Includes salary range estimates
- Identifies skill gaps with career development advice

**API Endpoint:** `POST /api/ai/recommendations/jobs`

**Frontend Component:** `<AIJobMatcher workerId={id} onMatchesFound={callback} />`

### 2. **Worker Recommendations for Jobs**
- Matches available workers to job requirements
- Ranks candidates by match score (0-100%)
- Highlights strengths and potential concerns
- Provides hiring recommendations (hire/interview/pass)
- Analyzes up to 50 workers simultaneously

**API Endpoint:** `POST /api/ai/recommendations/workers`

**Frontend Component:** `<AIWorkerMatcher jobId={id} onWorkersFound={callback} />`

### 3. **Skill Gap Analysis**
- Compares current skills vs. target profession requirements
- Prioritizes missing skills (high/medium/low)
- Provides learning time estimates
- Suggests learning resources
- Creates personalized development plan
- Includes market outlook for target profession

**API Endpoint:** `POST /api/ai/skills/gap-analysis`

**Frontend Component:** `<AISkillGapAnalyzer currentSkills={[]} targetProfession="..." />`

### 4. **Skill Recommendations**
- Suggests valuable skills to learn based on profession
- Identifies high-impact skills for career growth
- Provides market-driven recommendations

**API Endpoint:** `POST /api/ai/skills/recommendations`

**Frontend Component:** `<AISkillRecommender profession="..." currentSkills={[]} />`

### 5. **Text Enhancement**
- **Job Descriptions:** Makes job posts more professional and appealing
- **Worker Bios:** Enhances professional profiles
- **Job Titles:** Optimizes for clarity and searchability
- **Cover Letters:** Improves application messages
- **Company Descriptions:** Polishes employer profiles

**API Endpoint:** `POST /api/ai/enhance`

**Frontend Component:** `<AIEnhanceButton text="..." type="jobDescription" onEnhanced={callback} />`

### 6. **Salary Estimation**
- Estimates fair hourly and monthly rates
- Based on profession, skills, experience, and location
- Provides salary range (min-max)
- Lists factors affecting compensation
- Includes market insights

**API Endpoint:** `POST /api/ai/salary/estimate`

**Frontend Component:** `<AISalaryEstimator profession="..." skills={[]} experience={0} />`

### 7. **Interview Questions Generator**
- Creates role-specific interview questions
- Tailored to job requirements and experience level
- Includes purpose of each question
- Provides hints for ideal answers

**API Endpoint:** `POST /api/ai/interview/questions`

### 8. **Conversational AI Assistant**
- Context-aware chatbot for workers, employers, and admins
- Role-specific guidance and support
- Maintains conversation history
- Provides actionable career advice

**API Endpoint:** `POST /api/ai/chat`

**Frontend Component:** `<AIHelperBot />` (floating chat widget)

### 9. **Smart Search Enhancement**
- Suggests alternative search terms
- Improves search query effectiveness
- Helps users find better matches

**API Endpoint:** `POST /api/ai/search/enhance`

## 📁 Project Structure

```
backend/
├── services/
│   └── ai.service.js          # Core AI service with Groq integration
├── controllers/
│   └── ai.controller.js       # AI endpoint controllers
└── routes/
    └── ai.routes.js           # AI API routes

frontend/
├── services/
│   └── aiService.js           # AI API client
└── components/
    ├── AIJobMatcher.jsx       # Job recommendations
    ├── AIWorkerMatcher.jsx    # Worker recommendations
    ├── AISkillRecommender.jsx # Skill suggestions
    ├── AISkillGapAnalyzer.jsx # Skill gap analysis
    ├── AISalaryEstimator.jsx  # Salary estimation
    ├── AIEnhanceButton.jsx    # Text enhancement
    └── AIHelperBot.jsx        # Chat assistant
```

## 🔧 Setup Instructions

### 1. Get Groq API Key

1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key

### 2. Configure Backend

Add to `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Install Dependencies

Backend dependencies are already included in `package.json`:
```json
{
  "dependencies": {
    "groq-sdk": "^0.37.0"
  }
}
```

### 4. Import Routes

Routes are automatically imported in `server.js`:
```javascript
import aiRoutes from './routes/ai.routes.js';
app.use('/api/ai', aiRoutes);
```

## 🎯 Usage Examples

### Backend API Usage

```javascript
// Get job recommendations
POST /api/ai/recommendations/jobs
Body: { "workerId": "60d5ec49f1b2c72b8c8e4f1a" }

// Get worker recommendations
POST /api/ai/recommendations/workers
Body: { 
  "jobId": "60d5ec49f1b2c72b8c8e4f1b",
  "maxResults": 10
}

// Analyze skill gap
POST /api/ai/skills/gap-analysis
Body: {
  "currentSkills": ["Welding", "Metal Cutting"],
  "targetProfession": "Industrial Fabricator"
}

// Enhance text
POST /api/ai/enhance
Body: {
  "text": "Need plumber for house",
  "type": "jobDescription"
}

// Estimate salary
POST /api/ai/salary/estimate
Body: {
  "profession": "Electrician",
  "skills": ["Wiring", "Installation"],
  "experience": 5,
  "location": "Kochi"
}

// Chat with AI
POST /api/ai/chat
Body: {
  "message": "How can I improve my electrician profile?",
  "conversationId": "user-123-chat",
  "role": "worker"
}
```

### Frontend Component Usage

```jsx
import AIJobMatcher from '@/components/AIJobMatcher';
import AIWorkerMatcher from '@/components/AIWorkerMatcher';
import AISkillGapAnalyzer from '@/components/AISkillGapAnalyzer';
import AISalaryEstimator from '@/components/AISalaryEstimator';
import AIEnhanceButton from '@/components/AIEnhanceButton';

// Worker Dashboard - Job Recommendations
<AIJobMatcher
  workerId={user._id}
  onMatchesFound={(matches) => console.log(matches)}
/>

// Employer Dashboard - Worker Recommendations
<AIWorkerMatcher
  jobId={jobId}
  onWorkersFound={(workers) => setRecommendedWorkers(workers)}
/>

// Worker Profile - Skill Gap Analysis
<AISkillGapAnalyzer
  currentSkills={worker.skills}
  targetProfession="Senior Electrician"
/>

// Worker Profile - Salary Estimation
<AISalaryEstimator
  profession={worker.profession}
  skills={worker.skills}
  experience={worker.experience}
  location={worker.location.city}
/>

// Job Creation - Text Enhancement
<AIEnhanceButton
  text={jobDescription}
  type="jobDescription"
  onEnhanced={(enhanced) => setJobDescription(enhanced)}
/>
```

## 🧠 AI Service Architecture

### Singleton Pattern
The AI service uses a singleton pattern to maintain a single Groq client instance and manage conversation caching efficiently.

### Conversation Management
- Conversations are cached in memory with a maximum size limit
- Each conversation maintains up to 20 messages for context
- Automatic cleanup of old conversations when cache is full

### Error Handling
- Graceful fallbacks for failed API calls
- JSON parsing with fallback to raw text responses
- User-friendly error messages

### Performance Optimization
- Response caching to reduce API calls
- Token limits to control costs
- Conversation pruning to maintain context without bloating

## 💰 Cost Considerations

Groq offers:
- **Free Tier:** Generous free usage limits
- **Fast Inference:** Extremely fast response times
- **Cost-Effective:** Lower costs compared to other LLM providers

Recommended settings for cost optimization:
- `temperature: 0.3-0.7` (lower = more consistent, cheaper)
- `max_tokens: 500-2000` (based on use case)
- Cache conversations to reduce redundant calls

## 🔒 Security & Best Practices

1. **API Key Protection**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys periodically

2. **Rate Limiting**
   - AI endpoints inherit from global rate limiter
   - Consider stricter limits for expensive operations

3. **Input Validation**
   - All inputs are validated using express-validator
   - Prevents malicious prompts and injection attacks

4. **Error Handling**
   - No sensitive data in error messages
   - Proper logging for debugging
   - Graceful degradation when AI is unavailable

## 📊 Monitoring & Analytics

Track these metrics:
- AI API call success/failure rates
- Average response times
- Token usage and costs
- User engagement with AI features
- Recommendation acceptance rates

## 🚀 Future Enhancements

Potential additions:
- **Multi-language Support:** Recommendations in Malayalam, Tamil, Hindi
- **Resume Parsing:** Extract skills and experience from resumes
- **Predictive Analytics:** Predict job success likelihood
- **Voice Interface:** Voice-based AI assistant
- **Image Analysis:** Analyze portfolio images and certificates
- **Sentiment Analysis:** Analyze reviews and feedback
- **Market Trends:** Real-time labor market insights

## 🐛 Troubleshooting

### AI Service Not Working
1. Check if `GROQ_API_KEY` is set in `.env`
2. Verify API key is valid at [Groq Console](https://console.groq.com)
3. Check API rate limits
4. Review server logs for errors

### Poor Recommendations
1. Ensure user profiles are complete (skills, experience, location)
2. Check if there's sufficient data in the database
3. Adjust temperature and max_tokens in `ai.service.js`

### Slow Response Times
1. Groq is typically very fast (< 1 second)
2. Check network connectivity
3. Reduce max_tokens if possible
4. Implement response caching

## 📞 Support

For Groq API issues:
- Documentation: https://console.groq.com/docs
- Support: support@groq.com

For SkillConnect AI issues:
- Check the service health: `GET /api/ai/health`
- Review error logs in the backend console
- Ensure all dependencies are installed

## 📄 License

The AI recommendation system is part of SkillConnect Kerala and follows the same license as the main application.

---

**Powered by Groq's Llama 3.3 70B Versatile Model** 🚀
