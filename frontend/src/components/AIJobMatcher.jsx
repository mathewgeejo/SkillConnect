import { useState } from 'react';
import { FiZap, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import aiService from '../services/aiService';

const AIJobMatcher = ({ workerId, onMatchesFound }) => {
  const [loading, setLoading] = useState(false);

  const findMatches = async () => {
    if (!workerId) {
      toast.error('Worker profile not found');
      return;
    }

    setLoading(true);
    try {
      const response = await aiService.getJobRecommendations(workerId);
      
      if (response.success && response.data) {
        const recommendations = response.data.recommendations || [];
        
        if (recommendations.length > 0) {
          onMatchesFound(recommendations);
          toast.success('AI recommendations generated!');
        } else {
          toast.info('Complete your profile to get better recommendations');
        }
      }
    } catch (error) {
      console.error('Error getting AI matches:', error);
      toast.error(error.response?.data?.message || 'Failed to get AI recommendations');
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
