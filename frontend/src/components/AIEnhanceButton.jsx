import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import aiService from '../services/aiService';

const AIEnhanceButton = ({ text, onEnhanced, type = 'jobDescription' }) => {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!text || text.length < 10) {
      toast.error('Please provide more text to enhance');
      return;
    }

    setLoading(true);
    try {
      const response = await aiService.enhanceText(text, type);
      
      if (response.success && response.data) {
        onEnhanced(response.data.enhanced);
        toast.success('Text enhanced successfully!');
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast.error(error.response?.data?.message || 'Failed to enhance text');
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
