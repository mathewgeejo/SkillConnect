import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiMapPin, FiBriefcase, FiAward, FiPhone, FiMail, FiCalendar, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewCard from '../components/ReviewCard';

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchWorkerProfile();
  }, [id]);

  const fetchWorkerProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/workers/${id}`);
      setWorker(data.data);
    } catch (error) {
      console.error('Error fetching worker profile:', error);
      toast.error('Failed to load worker profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Worker Not Found</h2>
          <p className="text-slate-600 mb-4">The worker profile you're looking for doesn't exist.</p>
          <Link to="/workers" className="btn btn-primary">
            <FiArrowLeft /> Back to Workers
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link to="/workers" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
          <FiArrowLeft /> Back to Workers
        </Link>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-4xl">
                {worker.name?.charAt(0).toUpperCase() || 'W'}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-slate-900 mb-2">{worker.name}</h1>
                  <p className="text-xl text-primary-600 font-semibold mb-2">{worker.profession}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-primary-500" />
                      <span>{worker.location?.city || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="text-primary-500" />
                      <span>{worker.experience || 0} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiStar className="text-amber-500" />
                      <span className="font-medium">{worker.rating ? Number(worker.rating).toFixed(1) : 'N/A'}</span>
                      <span>({worker.totalReviews || 0} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">₹{worker.hourlyRate || 0}/hr</div>
                    <div className="text-sm text-slate-600">Hourly Rate</div>
                  </div>
                  {worker.isVerified && (
                    <span className="badge bg-emerald-100 text-emerald-700 self-end">
                      <FiAward className="w-4 h-4" /> Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="btn btn-primary">
                  <FiMail /> Contact Worker
                </button>
                <button className="btn btn-outline">
                  <FiCalendar /> Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-4">About</h2>
                <p className="text-slate-700 leading-relaxed">
                  {worker.bio || 'No bio available.'}
                </p>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Experience Highlights</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>{worker.experience || 0} years of professional experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>Completed {worker.completedJobs || 0} successful projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>Average rating: {worker.rating ? Number(worker.rating).toFixed(1) : 'N/A'} stars</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
                {worker.skills && worker.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">No skills listed.</p>
                )}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="card">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Reviews</h2>
                  <p className="text-slate-600">Reviews will be displayed here.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'portfolio' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-4">Portfolio</h2>
                <p className="text-slate-600">Portfolio items will be displayed here.</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {worker.phone && (
                  <div className="flex items-center gap-3 text-slate-700">
                    <FiPhone className="text-primary-500 flex-shrink-0" />
                    <span>{worker.phone}</span>
                  </div>
                )}
                {worker.email && (
                  <div className="flex items-center gap-3 text-slate-700">
                    <FiMail className="text-primary-500 flex-shrink-0" />
                    <span className="break-all">{worker.email}</span>
                  </div>
                )}
                {worker.location?.address && (
                  <div className="flex items-start gap-3 text-slate-700">
                    <FiMapPin className="text-primary-500 flex-shrink-0 mt-1" />
                    <span>{worker.location.address}, {worker.location.city}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">Completed Jobs</span>
                    <span className="text-lg font-bold text-slate-900">{worker.completedJobs || 0}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">Success Rate</span>
                    <span className="text-lg font-bold text-emerald-600">
                      {worker.completedJobs > 0 ? '95%' : 'N/A'}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">Response Time</span>
                    <span className="text-lg font-bold text-slate-900">2 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Availability</h3>
              <div className={`px-4 py-2 rounded-lg ${
                worker.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {worker.isActive ? 'Available for work' : 'Currently unavailable'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
