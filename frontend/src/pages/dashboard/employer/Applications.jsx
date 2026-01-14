import { useState, useEffect } from 'react';
import { FiUsers, FiStar, FiMapPin, FiCheck, FiX, FiEye, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getJobApplications, updateApplicationStatus, getJobs } from '../../../services/jobService';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useAuthStore from '../../../store/authStore';

const Applications = () => {
  const user = useAuthStore((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchJobsAndApplications();
  }, []);

  const fetchJobsAndApplications = async () => {
    try {
      setLoading(true);
      // Get all jobs posted by this employer
      const employerId = user?._id;
      const jobsResponse = employerId ? await getJobs({ employer: employerId }) : await getJobs();
      setJobs(jobsResponse.data || []);

      // Get applications for all jobs
      const allApplications = [];
      for (const job of jobsResponse.data || []) {
        try {
          const appResponse = await getJobApplications(job._id);
          if (appResponse.data && appResponse.data.length > 0) {
            const applicationsWithJobInfo = appResponse.data.map(app => ({
              ...app,
              jobTitle: job.title,
              jobId: job._id
            }));
            allApplications.push(...applicationsWithJobInfo);
          }
        } catch (error) {
          console.error(`Error fetching applications for job ${job._id}:`, error);
        }
      }
      setApplications(allApplications);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesJob = selectedJob === 'all' || app.jobId === selectedJob;
    return matchesStatus && matchesJob;
  });

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
    shortlisted: { label: 'Shortlisted', color: 'bg-primary-100 text-primary-700' },
    reviewed: { label: 'Reviewed', color: 'bg-blue-100 text-blue-700' },
    rejected: { label: 'Rejected', color: 'bg-rose-100 text-rose-700' },
    hired: { label: 'Hired', color: 'bg-emerald-100 text-emerald-700' },
  };

  const handleStatusUpdate = async (appId, jobId, newStatus) => {
    try {
      await updateApplicationStatus(jobId, appId, newStatus);
      setApplications(apps => apps.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));
      
      const statusMessages = {
        reviewed: 'Application marked as reviewed',
        shortlisted: 'Worker shortlisted for further review',
        rejected: 'Application rejected',
        hired: 'Worker hired! Congratulations!'
      };
      
      toast.success(statusMessages[newStatus] || 'Status updated');
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  const handleAccept = (appId, jobId) => handleStatusUpdate(appId, jobId, 'hired');
  const handleReject = (appId, jobId) => handleStatusUpdate(appId, jobId, 'rejected');
  const handleShortlist = (appId, jobId) => handleStatusUpdate(appId, jobId, 'shortlisted');

  const stats = [
    { label: 'Total Applications', value: applications.length, color: 'text-primary-600', bgColor: 'bg-primary-50' },
    { label: 'Pending Review', value: applications.filter(a => a.status === 'pending').length, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length, color: 'text-primary-600', bgColor: 'bg-primary-50' },
    { label: 'Hired', value: applications.filter(a => a.status === 'hired').length, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">Job Applications</h1>
        <p className="text-slate-600 mt-1">Review and manage worker applications</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card">
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
              <FiUsers className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="card">
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'reviewed', 'shortlisted', 'hired', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="card text-center py-12">
          <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications yet</h3>
          <p className="text-slate-600">Applications from workers will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app, index) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {app.worker?.name?.charAt(0).toUpperCase() || 'W'}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">{app.worker?.name || 'Unknown Worker'}</h3>
                      <p className="text-slate-600">{app.worker?.profession || 'Worker'} • {app.worker?.experience || '0'} years experience</p>
                    </div>
                    <span className={`badge ${statusConfig[app.status]?.color || 'bg-slate-100 text-slate-700'} self-start`}>
                      {statusConfig[app.status]?.label || app.status}
                    </span>
                  </div>

                  <div className="bg-primary-50 border-l-4 border-primary-500 p-3 rounded mb-4">
                    <p className="text-sm font-medium text-primary-900">Applied for: {app.jobTitle}</p>
                    <p className="text-xs text-primary-700 mt-1">
                      <FiCalendar className="inline w-3 h-3 mr-1" />
                      Submitted {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  {app.coverLetter && (
                    <div className="bg-slate-50 p-3 rounded mb-4">
                      <p className="text-sm text-slate-700">{app.coverLetter}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <FiMapPin className="w-4 h-4 text-slate-500" />
                      <span>{app.worker?.location?.city || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <FiStar className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">{app.worker?.rating?.toFixed(1) || 'N/A'}</span>
                      <span className="text-slate-500">({app.worker?.totalReviews || 0} reviews)</span>
                    </div>
                  </div>

                  {app.worker?.skills && app.worker.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-slate-600 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {app.worker.skills.slice(0, 5).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Link to={`/worker/${app.worker?._id}`} className="btn btn-outline text-sm">
                      <FiEye /> View Profile
                    </Link>
                    {app.status === 'pending' && (
                      <>
                        <button onClick={() => handleShortlist(app._id, app.jobId)} className="btn btn-outline text-sm">
                          <FiCalendar /> Shortlist
                        </button>
                        <button onClick={() => handleAccept(app._id, app.jobId)} className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                          <FiCheck /> Hire
                        </button>
                        <button onClick={() => handleReject(app._id, app.jobId)} className="btn bg-rose-600 hover:bg-rose-700 text-white text-sm">
                          <FiX /> Reject
                        </button>
                      </>
                    )}
                    {(app.status === 'shortlisted' || app.status === 'reviewed') && (
                      <>
                        <button onClick={() => handleAccept(app._id, app.jobId)} className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                          <FiCheck /> Hire
                        </button>
                        <button onClick={() => handleReject(app._id, app.jobId)} className="btn bg-rose-600 hover:bg-rose-700 text-white text-sm">
                          <FiX /> Reject
                        </button>
                      </>
                    )}
                    {app.status === 'hired' && (
                      <button className="btn bg-emerald-600 text-white text-sm cursor-not-allowed" disabled>
                        <FiCheck /> Hired
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
