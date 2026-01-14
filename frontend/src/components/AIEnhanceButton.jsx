import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const AIEnhanceButton = ({ text, onEnhanced, type = 'description' }) => {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!text || text.length < 10) {
      toast.error('Please provide more text to enhance');
      return;
    }

    setLoading(true);
    try {
      const prompts = {
        description: 'Enhance and improve this job description to make it more professional, clear, and appealing to workers. Keep it concise (max 200 words):',
        bio: 'Improve this professional bio to make it more compelling and highlight key strengths. Keep it under 150 words:',
        title: 'Make this job title more professional and clear (one line only):',
      };

      const response = await axios.post('http://localhost:5000/api/chat/ai/message', {
        message: `${prompts[type]} "${text}"`,
        conversationId: `enhance-${Date.now()}`,
        role: 'employer',
      });

      onEnhanced(response.data.data.message);
      toast.success('Text enhanced successfully!');
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast.error('Failed to enhance text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleEnhance}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      title="Enhance with AI"
    >
      <FiZap className={`w-4 h-4 ${loading ? 'animate-pulse' : ''}`} />
      {loading ? 'Enhancing...' : 'AI Enhance'}
    </button>
  );
};

export default AIEnhanceButton;
