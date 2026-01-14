import { useState } from 'react';
import { FiZap, FiLoader } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const AIJobMatcher = ({ workerProfile, onMatchesFound }) => {
  const [loading, setLoading] = useState(false);

  const findMatches = async () => {
    if (!workerProfile?.skills || workerProfile.skills.length === 0) {
      toast.error('Please add skills to your profile first');
      return;
    }

    setLoading(true);
    try {
      const skillsText = Array.isArray(workerProfile.skills)
        ? workerProfile.skills.join(', ')
        : workerProfile.skills;

      const prompt = `Based on these worker skills: ${skillsText}, profession: ${workerProfile.profession}, and experience: ${workerProfile.experience || 0} years, suggest 3 most suitable job types they should apply for. Format as a simple list, one job type per line.`;

      const response = await axios.post('http://localhost:5000/api/chat/ai/message', {
        message: prompt,
        conversationId: `job-match-${Date.now()}`,
        role: 'worker',
      });

      const suggestions = response.data.data.message
        .split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 3);

      onMatchesFound(suggestions);
      toast.success('AI recommendations generated!');
    } catch (error) {
      console.error('Error getting AI matches:', error);
      toast.error('Failed to get AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={findMatches}
      disabled={loading}
      className="btn btn-primary flex items-center gap-2"
    >
      {loading ? (
        <>
          <FiLoader className="w-5 h-5 animate-spin" />
          Finding best matches...
        </>
      ) : (
        <>
          <FiZap className="w-5 h-5" />
          Get AI Job Recommendations
        </>
      )}
    </button>
  );
};

export default AIJobMatcher;
