import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
    >
      <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-red-800 font-medium">Error</h4>
        <p className="text-red-600 text-sm mt-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-700 hover:text-red-800 font-medium underline"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
