import { useState, useMemo, useEffect } from 'react';
import { FiUser, FiMapPin, FiBriefcase, FiPhone, FiMail, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import useAuthStore from '../../../store/authStore';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use mock data if user is missing
  const profileUser = useMemo(() => user || {
    _id: 'mock-user-id',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    profession: 'Electrician',
    location: 'Mumbai, Maharashtra',
    experience: '5 years',
    hourlyRate: '500',
    bio: 'Experienced electrician specializing in residential and commercial electrical work.',
    skills: ['Wiring', 'Circuit Installation', 'Troubleshooting', 'Maintenance'],
    role: 'worker'
  }, [user]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    location: '',
    experience: '',
    hourlyRate: '',
    bio: '',
    skills: '',
  });

  // Populate form data when profileUser changes
  useEffect(() => {
    const skills = Array.isArray(profileUser?.skills)
      ? profileUser.skills.join(', ')
      : typeof profileUser?.skills === 'string'
      ? profileUser.skills
      : '';

    // Handle location - convert object to string if needed
    const location = typeof profileUser?.location === 'string' 
      ? profileUser.location 
      : profileUser?.location?.address || profileUser?.location?.city || '';

    setFormData({
      name: profileUser?.name || '',
      email: profileUser?.email || '',
      phone: profileUser?.phone || '',
      profession: profileUser?.profession || '',
      location,
      experience: profileUser?.experience || '',
      hourlyRate: profileUser?.hourlyRate || '',
      bio: profileUser?.bio || '',
      skills,
    });
  }, [profileUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = { ...formData, skills: formData.skills.split(',').map(s => s.trim()) };
      if (user) {
        await updateProfile(updatedData);
      } else {
        // Mock update for development
        console.log('Mock update:', updatedData);
        toast.success('Profile updated (mock mode)');
      }
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn btn-primary w-full sm:w-auto">
            <FiEdit2 /> Edit Profile
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-1">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto mb-4">
              {profileUser?.name?.charAt(0) || 'W'}
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900">{profileUser?.name}</h2>
            <p className="text-gray-600">{profileUser?.profession || 'Worker'}</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
              <FiMapPin className="w-4 h-4" />
              {typeof profileUser?.location === 'string' 
                ? profileUser.location 
                : profileUser?.location?.address || profileUser?.location?.city || 'Kerala'}
            </div>
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Profile Views</span>
                <span className="font-medium">234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading font-bold text-gray-900">Personal Information</h3>
              {isEditing && (
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline text-sm">
                    <FiX /> Cancel
                  </button>
                  <button type="submit" disabled={loading} className="btn btn-primary text-sm">
                    {loading ? <div className="spinner border-white" /> : <><FiSave /> Save</>}
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={!isEditing} className="input pl-10" required />
                </div>
              </div>
              <div>
                <label className="label">Profession *</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" value={formData.profession} onChange={(e) => setFormData({...formData, profession: e.target.value})} disabled={!isEditing} className="input pl-10" placeholder="e.g., Electrician" required />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Email *</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={!isEditing} className="input pl-10" required />
                </div>
              </div>
              <div>
                <label className="label">Phone *</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={!isEditing} className="input pl-10" required />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Location *</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} disabled={!isEditing} className="input pl-10" placeholder="e.g., Kottayam" required />
                </div>
              </div>
              <div>
                <label className="label">Experience</label>
                <input type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} disabled={!isEditing} className="input" placeholder="e.g., 5 years" />
              </div>
            </div>

            <div>
              <label className="label">Hourly Rate</label>
              <input type="text" value={formData.hourlyRate} onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})} disabled={!isEditing} className="input" placeholder="e.g., ₹500/hour" />
            </div>

            <div>
              <label className="label">Skills (comma-separated)</label>
              <input type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} disabled={!isEditing} className="input" placeholder="e.g., Wiring, Installation, Repair" />
            </div>

            <div>
              <label className="label">Bio</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} disabled={!isEditing} className="input min-h-[100px]" placeholder="Tell us about yourself..." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
