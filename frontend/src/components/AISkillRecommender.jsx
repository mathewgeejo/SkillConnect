import { useState } from 'react';
import { FiZap, FiLoader } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const AISkillRecommender = ({ currentProfession, onSkillsRecommended }) => {
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!currentProfession) {
      toast.error('Please select your profession first');
      return;
    }

    setLoading(true);
    try {
      const prompt = `For a ${currentProfession} professional in India, suggest 5 most valuable additional skills they should learn to increase their marketability and earning potential. List only the skill names, one per line.`;

      const response = await axios.post('http://localhost:5000/api/chat/ai/message', {
        message: prompt,
        conversationId: `skill-recommend-${Date.now()}`,
        role: 'worker',
      });

      const skills = response.data.data.message
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^\d+\.\s*|-\s*|\*\s*/g, '').trim())
        .slice(0, 5);

      onSkillsRecommended(skills);
      toast.success('Skill recommendations generated!');
    } catch (error) {
      console.error('Error getting skill recommendations:', error);
      toast.error('Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={getRecommendations}
      disabled={loading}
      className="btn btn-secondary flex items-center gap-2 text-sm"
    >
      {loading ? (
        <>
          <FiLoader className="w-4 h-4 animate-spin" />
          Getting suggestions...
        </>
      ) : (
        <>
          <FiZap className="w-4 h-4" />
          AI Skill Suggestions
        </>
      )}
    </button>
  );
};

export default AISkillRecommender;
