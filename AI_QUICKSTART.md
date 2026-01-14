# 🚀 AI Recommendation System - Quick Start Guide

## ✅ What's Been Set Up

Your SkillConnect Kerala platform now has a **comprehensive AI-powered recommendation system** integrated with:

- ✅ **Groq API Integration** - Ultra-fast AI using Llama 3.3 70B model
- ✅ **Backend AI Service** - Centralized service with 9 AI features
- ✅ **AI Controller & Routes** - RESTful API endpoints for all AI features
- ✅ **Frontend Service** - Easy-to-use API client for all AI features
- ✅ **6 React Components** - Ready-to-use AI UI components
- ✅ **Comprehensive Documentation** - Complete API and usage guide

## 🎯 Available AI Features

### For Workers:
1. **Job Recommendations** - AI suggests best-matching jobs
2. **Skill Gap Analysis** - Identifies skills to learn for career growth
3. **Skill Recommendations** - Suggests valuable skills for your profession
4. **Salary Estimation** - Estimates fair compensation rates
5. **Profile Enhancement** - Improves bio and descriptions
6. **AI Assistant** - Conversational helper for career guidance

### For Employers:
1. **Worker Recommendations** - AI matches best workers to jobs
2. **Interview Questions** - Generates role-specific questions
3. **Job Description Enhancement** - Makes job posts more appealing
4. **Salary Guidance** - Fair market rates for positions
5. **Smart Search** - Better search suggestions
6. **AI Assistant** - Hiring and recruitment guidance

## 📋 Test the Setup

### 1. Test AI Service (Optional)
```bash
cd backend
node test-ai.js
```

This will verify:
- Groq API key is working
- AI service is configured correctly
- All AI features are functional

### 2. Start the Servers

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### 3. Test in Browser

Once both servers are running:

1. **Test AI Health:**
   - Open: http://localhost:5000/api/ai/health
   - Should show AI service status and features

2. **Test AI Chat (via browser console):**
   ```javascript
   fetch('http://localhost:5000/api/ai/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       message: 'Hello, can you help me?',
       conversationId: 'test-123',
       role: 'worker'
     })
   }).then(r => r.json()).then(console.log)
   ```

## 🎨 Using AI Components in Your App

### Example 1: Worker Dashboard - Job Recommendations

```jsx
// In: frontend/src/pages/dashboard/worker/Dashboard.jsx

import AIJobMatcher from '../../../components/AIJobMatcher';
import { useState } from 'react';
import useAuthStore from '../../../store/authStore';

function WorkerDashboard() {
  const { user } = useAuthStore();
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div>
      <h1>Your Dashboard</h1>
      
      {/* AI Job Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2>AI Job Recommendations</h2>
        <AIJobMatcher
          workerId={user._id}
          onMatchesFound={(matches) => {
            setRecommendations(matches);
            console.log('AI Recommendations:', matches);
          }}
        />
        
        {/* Display recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-4 space-y-2">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="border p-3 rounded">
                <h3>{rec.jobType}</h3>
                <p>{rec.reasoning}</p>
                <span>Match: {rec.skillMatch}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Example 2: Employer Dashboard - Worker Matching

```jsx
// In: frontend/src/pages/dashboard/employer/Applications.jsx

import AIWorkerMatcher from '../../../components/AIWorkerMatcher';

function JobApplications({ jobId }) {
  return (
    <div>
      <h1>Job Applications</h1>
      
      {/* AI Worker Recommendations */}
      <AIWorkerMatcher
        jobId={jobId}
        onWorkersFound={(workers) => {
          console.log('Top worker matches:', workers);
        }}
      />
    </div>
  );
}
```

### Example 3: Profile Page - Skill Development

```jsx
// In: frontend/src/pages/dashboard/worker/Profile.jsx

import AISkillGapAnalyzer from '../../../components/AISkillGapAnalyzer';
import AISalaryEstimator from '../../../components/AISalaryEstimator';

function WorkerProfile({ worker }) {
  return (
    <div>
      {/* Skill Gap Analysis */}
      <AISkillGapAnalyzer
        currentSkills={worker.skills}
        targetProfession="Senior Electrician"
      />
      
      {/* Salary Estimation */}
      <AISalaryEstimator
        profession={worker.profession}
        skills={worker.skills}
        experience={worker.experience}
        location={worker.location?.city}
      />
    </div>
  );
}
```

### Example 4: Job Creation - Text Enhancement

```jsx
// In: frontend/src/pages/dashboard/employer/CreateJob.jsx

import { useState } from 'react';
import AIEnhanceButton from '../../../components/AIEnhanceButton';

function CreateJob() {
  const [jobDescription, setJobDescription] = useState('');

  return (
    <form>
      <div>
        <label>Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
        />
        
        {/* AI Enhancement Button */}
        <AIEnhanceButton
          text={jobDescription}
          type="jobDescription"
          onEnhanced={(enhanced) => setJobDescription(enhanced)}
        />
      </div>
    </form>
  );
}
```

## 📡 API Endpoints Reference

All endpoints are available at `http://localhost:5000/api/ai/`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Check AI service status |
| `/recommendations/jobs` | POST | Get job recommendations for worker |
| `/recommendations/workers` | POST | Get worker recommendations for job |
| `/skills/gap-analysis` | POST | Analyze skill gaps |
| `/skills/recommendations` | POST | Get skill recommendations |
| `/enhance` | POST | Enhance text with AI |
| `/search/enhance` | POST | Improve search queries |
| `/interview/questions` | POST | Generate interview questions |
| `/salary/estimate` | POST | Estimate fair salary |
| `/chat` | POST | Chat with AI assistant |
| `/chat/:id` | DELETE | Clear conversation |

## 🔑 Environment Variables

Make sure your `.env` file has:

```env
GROQ_API_KEY=your_actual_groq_api_key_here
```

Get your free API key at: https://console.groq.com/keys

## 🎯 Next Steps

1. **Integrate Components:**
   - Add AI components to worker dashboard
   - Add AI components to employer dashboard
   - Add AI chat bot to all pages (already floating)

2. **Customize Prompts:**
   - Edit `backend/services/ai.service.js`
   - Adjust system messages for your use case
   - Fine-tune temperature and max_tokens

3. **Add Analytics:**
   - Track which AI features are most used
   - Monitor recommendation quality
   - Gather user feedback

4. **Optimize Performance:**
   - Implement Redis caching for frequent queries
   - Add request queuing for rate limit management
   - Cache popular recommendations

## 🐛 Troubleshooting

**Issue:** AI endpoints return errors
- **Solution:** Check if GROQ_API_KEY is set correctly in `.env`

**Issue:** Slow AI responses
- **Solution:** Groq is very fast (<1s usually). Check internet connection.

**Issue:** "Model not found" error
- **Solution:** Verify you're using `llama-3.3-70b-versatile` (current default)

**Issue:** Rate limit errors
- **Solution:** Groq has generous free limits. Implement caching if hitting limits.

## 📚 Documentation

- **Full AI Features Guide:** See `AI_FEATURES.md`
- **API Documentation:** See endpoint comments in `ai.controller.js`
- **Service Documentation:** See comments in `ai.service.js`

## 💡 Pro Tips

1. **Better Recommendations:** Ensure user profiles are complete (more data = better AI)
2. **Cost Optimization:** Use lower temperature (0.3-0.5) for factual queries
3. **User Experience:** Show loading states and provide fallbacks
4. **Privacy:** Never send sensitive personal data to AI
5. **Monitoring:** Track AI usage to understand user behavior

## 🎉 You're All Set!

Your AI recommendation system is fully integrated and ready to use. Start the servers and try out the features!

For questions or issues, refer to:
- `AI_FEATURES.md` - Complete feature documentation
- Backend logs - Check console for errors
- Groq Console - https://console.groq.com for API status

Happy building! 🚀
