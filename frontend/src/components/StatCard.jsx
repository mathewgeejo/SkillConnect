import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
  const colors = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-600',
      icon: 'text-primary-500',
    },
    secondary: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-600',
      icon: 'text-secondary-500',
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      icon: 'text-green-500',
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      icon: 'text-yellow-500',
    },
    danger: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: 'text-red-500',
    },
  };

  const colorScheme = colors[color] || colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="card cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-lg ${colorScheme.bg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorScheme.icon}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.type === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.type === 'up' ? '↑' : '↓'}</span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className={`text-3xl font-bold ${colorScheme.text}`}>{value}</div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
