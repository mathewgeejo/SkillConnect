import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBriefcase, FiFileText, FiStar, FiDollarSign, 
  FiTrendingUp, FiCalendar, FiAward, FiMapPin 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import useAuthStore from '../../../store/authStore';
import AIJobMatcher from '../../../components/AIJobMatcher';

const WorkerDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    activeApplications: 0,
    completedJobs: 0,
    totalEarnings: 0,
    averageRating: 0,
  });
  const [aiRecommendations, setAiRecommendations] = useState([]);

  const recentActivities = [
    { id: 1, type: 'application', title: 'Applied for Electrician position', company: 'ABC Constructions', date: '2 hours ago', icon: FiFileText },
    { id: 2, type: 'review', title: 'Received 5-star review', company: 'XYZ Builders', date: '1 day ago', icon: FiStar },
    { id: 3, type: 'job', title: 'Completed Plumbing work', company: 'Home Services Ltd', date: '2 days ago', icon: FiBriefcase },
  ];

  const upcomingJobs = [
    { id: 1, title: 'Electrical Installation', company: 'Tech Park Solutions', location: 'Kottayam', date: 'Tomorrow, 10:00 AM', payment: '₹5,000' },
    { id: 2, title: 'Home Repair Work', company: 'Residential Complex', location: 'Alappuzha', date: 'Dec 20, 2025', payment: '₹3,500' },
  ];

  useEffect(() => {
    setStats({ activeApplications: 5, completedJobs: 12, totalEarnings: 45000, averageRating: 4.8 });
  }, []);

  const statCards = [
    { title: 'Active Applications', value: stats.activeApplications, icon: FiFileText, color: 'text-blue-600', bgColor: 'bg-blue-50', link: '/dashboard/worker/applications' },
    { title: 'Completed Jobs', value: stats.completedJobs, icon: FiBriefcase, color: 'text-green-600', bgColor: 'bg-green-50', link: '/dashboard/worker/jobs' },
    { title: 'Total Earnings', value: `₹${stats.totalEarnings.toLocaleString()}`, icon: FiDollarSign, color: 'text-secondary-600', bgColor: 'bg-secondary-50' },
    { title: 'Average Rating', value: stats.averageRating, icon: FiStar, color: 'text-yellow-600', bgColor: 'bg-yellow-50', link: '/dashboard/worker/reviews' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-primary-100">Here's your dashboard overview for today</p>
          </div>
          <Link to="/jobs" className="btn bg-white text-primary-700 hover:bg-gray-100 w-full md:w-auto">
            <FiTrendingUp /> Browse Jobs
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Link to={stat.link || '#'} className="card hover:shadow-lg transition-all block">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}><Icon className={`w-6 h-6 ${stat.color}`} /></div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* AI Job Recommendations Section */}
      <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-600 text-white rounded-lg">
            <FiTrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900">AI Job Recommendations</h2>
            <p className="text-sm text-gray-600">Get personalized job matches powered by AI</p>
          </div>
        </div>
        
        <AIJobMatcher
          workerId={user?._id}
          onMatchesFound={(matches) => {
            setAiRecommendations(matches);
          }}
        />

        {aiRecommendations.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-gray-800">Top Recommendations:</h3>
            {aiRecommendations.slice(0, 3).map((rec, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{rec.jobType}</h4>
                  <span className="badge bg-green-100 text-green-700">{rec.skillMatch}% Match</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.reasoning}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{rec.marketDemand} Demand</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{rec.estimatedSalary}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold">Upcoming Jobs</h2>
            <Link to="/dashboard/worker/jobs" className="text-secondary-500 hover:text-secondary-600 text-sm font-medium">View All</Link>
          </div>
          <div className="space-y-4">
            {upcomingJobs.map((job) => (
              <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-secondary-300 transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <span className="badge bg-green-100 text-green-700 w-fit">{job.payment}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><FiMapPin className="w-4 h-4" />{job.location}</span>
                  <span className="flex items-center gap-1"><FiCalendar className="w-4 h-4" />{job.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-heading font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0"><Icon className="w-5 h-5 text-primary-600" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.company}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-heading font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Link to="/dashboard/worker/profile" className="p-4 border-2 border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition text-center">
            <FiFileText className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-secondary-500" />
            <span className="text-xs md:text-sm font-medium">Update Profile</span>
          </Link>
          <Link to="/dashboard/worker/certificates" className="p-4 border-2 border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition text-center">
            <FiAward className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-secondary-500" />
            <span className="text-xs md:text-sm font-medium">Add Certificate</span>
          </Link>
          <Link to="/jobs" className="p-4 border-2 border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition text-center">
            <FiBriefcase className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-secondary-500" />
            <span className="text-xs md:text-sm font-medium">Find Jobs</span>
          </Link>
          <Link to="/dashboard/messages" className="p-4 border-2 border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition text-center">
            <FiFileText className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-secondary-500" />
            <span className="text-xs md:text-sm font-medium">Messages</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
