import { useState } from 'react';
import { FiFileText, FiMapPin, FiDollarSign, FiClock, FiEye, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Applications = () => {
  const [filter, setFilter] = useState('all');

  const applications = [
    { id: 1, jobTitle: 'Senior Electrician', company: 'Tech Park Solutions', location: 'Kottayam', salary: '₹25,000-₹35,000/month', appliedDate: '2 days ago', status: 'under_review', views: 5 },
    { id: 2, jobTitle: 'Home Wiring Project', company: 'Residential Complex', location: 'Alappuzha', salary: '₹40,000', appliedDate: '5 days ago', status: 'shortlisted', views: 12, interview: 'Dec 20, 10:00 AM' },
    { id: 3, jobTitle: 'Commercial Repair Work', company: 'ABC Builders', location: 'Kollam', salary: '₹500/hour', appliedDate: '1 week ago', status: 'rejected', views: 8, reason: 'Position filled' },
    { id: 4, jobTitle: 'Maintenance Contract', company: 'Hotel Services', location: 'Kottayam', salary: '₹60,000', appliedDate: '3 days ago', status: 'accepted', views: 15, startDate: 'Dec 22, 2025' },
    { id: 5, jobTitle: 'Factory Electrical Setup', company: 'Manufacturing Ltd', location: 'Pathanamthitta', salary: '₹30,000/month', appliedDate: '1 day ago', status: 'pending', views: 2 },
  ];

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700', icon: FiClock },
    under_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-700', icon: FiEye },
    shortlisted: { label: 'Shortlisted', color: 'bg-green-100 text-green-700', icon: FiFileText },
    accepted: { label: 'Accepted', color: 'bg-emerald-100 text-emerald-700', icon: FiFileText },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: FiXCircle },
  };

  const filteredApplications = filter === 'all' ? applications : applications.filter(app => app.status === filter);

  const stats = [
    { label: 'Total Applied', value: applications.length, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Under Review', value: applications.filter(a => a.status === 'under_review').length, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Accepted', value: applications.filter(a => a.status === 'accepted').length, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-1">My Applications</h1>
        <p className="text-gray-600">Track all your job applications</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2`}>
              <FiFileText className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="card">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'pending', 'under_review', 'shortlisted', 'accepted', 'rejected'].map((status) => (
            <button key={status} onClick={() => setFilter(status)} className={`btn btn-sm whitespace-nowrap ${filter === status ? 'btn-primary' : 'btn-outline'}`}>
              {status === 'all' ? 'All' : status === 'under_review' ? 'Under Review' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredApplications.map((app, index) => {
            const StatusIcon = statusConfig[app.status].icon;
            return (
              <motion.div key={app.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="border border-gray-200 rounded-lg p-4 hover:border-secondary-300 transition">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`badge ${statusConfig[app.status].color} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[app.status].label}
                      </span>
                      <span className="text-xs text-gray-500">Applied {app.appliedDate}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{app.jobTitle}</h3>
                    <p className="text-gray-600 mb-3">{app.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><FiMapPin className="w-4 h-4" />{app.location}</span>
                      <span className="flex items-center gap-1"><FiDollarSign className="w-4 h-4" />{app.salary}</span>
                      <span className="flex items-center gap-1"><FiEye className="w-4 h-4" />{app.views} views</span>
                    </div>
                    {app.interview && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                        <p className="text-sm text-green-800"><span className="font-semibold">Interview Scheduled:</span> {app.interview}</p>
                      </div>
                    )}
                    {app.startDate && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-2">
                        <p className="text-sm text-emerald-800"><span className="font-semibold">Start Date:</span> {app.startDate}</p>
                      </div>
                    )}
                    {app.reason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800"><span className="font-semibold">Reason:</span> {app.reason}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <Link to={`/jobs/${app.id}`} className="btn btn-outline flex-1 md:flex-none whitespace-nowrap">View Job</Link>
                    {app.status !== 'rejected' && (
                      <button className="btn btn-outline flex-1 md:flex-none text-red-600 hover:text-red-700 hover:border-red-600">Withdraw</button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FiFileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">Start applying for jobs to track them here</p>
            <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
