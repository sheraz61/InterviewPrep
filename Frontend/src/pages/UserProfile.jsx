import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, updateProfile, clearProfileError } from '../store/slices/profileSlice';
import ProfileForm from '../components/ProfileForm';
import InterviewHistory from '../components/InterviewHistory';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { myProfile, interviews, loading, updating, error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const handleSaveProfile = async (profileData) => {
    try {
      await dispatch(updateProfile(profileData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const calculateStats = () => {
    const totalInterviews = interviews.length;
    const completedInterviews = interviews.length;
    const averageScore = interviews.length > 0 
      ? Math.round((interviews.reduce((sum, i) => sum + (i.overallScore || 0), 0) / interviews.length) * 10) / 10
      : 0;
    
    return { totalInterviews, completedInterviews, averageScore };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
                <p className="text-gray-600 mb-1">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalInterviews}</div>
            <div className="text-gray-600">Total Interviews</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.completedInterviews}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.averageScore}/10</div>
            <div className="text-gray-600">Average Score</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg mb-6 flex items-center">
            <span className="text-lg mr-2">⚠️</span>
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-4 font-medium transition duration-200 ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`pb-4 px-4 font-medium transition duration-200 ${
                activeTab === 'interviews'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              💼 Interview History
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === 'overview' && (
              <div>
                {isEditing ? (
                  <ProfileForm 
                    profile={myProfile} 
                    onSave={handleSaveProfile}
                    onCancel={() => setIsEditing(false)}
                    loading={updating}
                  />
                ) : (
                  <ProfileOverview profile={myProfile} />
                )}
              </div>
            )}

            {activeTab === 'interviews' && (
              <InterviewHistory interviews={interviews} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Overview Component
const ProfileOverview = ({ profile }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Personal Information */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
      <div className="space-y-4">
        <InfoItem label="Current Role" value={profile?.profile?.currentRole} />
        <InfoItem label="Experience" value={profile?.profile?.experience} />
        <InfoItem label="Location" value={profile?.profile?.location} />
        <InfoItem label="Tech Stack" value={profile?.profile?.techStack} />
        <InfoItem label="Skills" value={profile?.profile?.skills} />
      </div>
    </div>

    {/* Bio & Links */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">About & Links</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg min-h-[100px]">
            {profile?.profile?.bio || 'No bio provided yet.'}
          </p>
        </div>
        
        <div className="flex space-x-4">
          {profile?.profile?.linkedin && (
            <a href={profile.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              LinkedIn
            </a>
          )}
          {profile?.profile?.github && (
            <a href={profile.profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Reusable Info Item Component
const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-900">{value || 'Not specified'}</span>
  </div>
);

export default UserProfile;