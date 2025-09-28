// pages/ViewProfile.jsx - UPDATED
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, clearUserProfile } from '../store/slices/profileSlice';

const ViewProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile, interviews, loading, error } = useSelector((state) => state.profile);
  
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLocalLoading(true);
      try {
        if (userId) {
          await dispatch(getUserProfile(userId)).unwrap();
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchProfile();

    return () => {
      dispatch(clearUserProfile());
    };
  }, [dispatch, userId]);

  if (localLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600">Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">
              {error || 'The requested profile could not be found.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Back to Dashboard
              </button>
              <Link 
                to="/profile" 
                className="block w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                View My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const calculateStats = () => {
    const totalInterviews = interviews.length;
    const completedInterviews = interviews.length;
    const averageScore = interviews.length > 0 
      ? Math.round((interviews.reduce((sum, i) => sum + (i.overallScore || 0), 0) / interviews.length) * 10) / 10
      : 0;
    
    return { totalInterviews, completedInterviews, averageScore };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {userProfile.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
                <p className="text-gray-600 mb-1">{userProfile.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(userProfile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link 
                to="/profile" 
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                My Profile
              </Link>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Back to Dashboard
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

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Details</h3>
              <div className="space-y-4">
                <InfoItem label="Current Role" value={userProfile.profile?.currentRole} />
                <InfoItem label="Experience" value={userProfile.profile?.experience} />
                <InfoItem label="Location" value={userProfile.profile?.location} />
                <InfoItem label="Tech Stack" value={userProfile.profile?.techStack} />
                <InfoItem label="Skills" value={userProfile.profile?.skills} />
              </div>
            </div>

            {/* Bio & Links */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg min-h-[100px]">
                    {userProfile.profile?.bio || 'No bio provided.'}
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  {userProfile.profile?.linkedin && (
                    <a href={userProfile.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
                      <span>💼</span>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {userProfile.profile?.github && (
                    <a href={userProfile.profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 flex items-center space-x-2">
                      <span>🐙</span>
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview History */}
        {interviews.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview History</h2>
            <InterviewHistory interviews={interviews} isPublic={true} />
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Info Item Component
const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-900">{value || 'Not specified'}</span>
  </div>
);

// Simple Interview History Component
const InterviewHistory = ({ interviews, isPublic = false }) => {
  if (interviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Interviews Yet</h3>
        <p className="text-gray-600">
          {isPublic ? 'This user has not completed any interviews yet.' : 'No interviews completed yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <div key={interview._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{interview.technology || 'General Interview'}</h4>
              <p className="text-sm text-gray-600">
                {new Date(interview.createdAt).toLocaleDateString()} • {interview.difficulty || 'Not specified'}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              interview.status === 'completed' 
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {interview.status}
            </span>
          </div>
          
          {interview.overallScore && (
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Overall Score</span>
                  <span className="text-sm font-bold text-gray-900">{interview.overallScore}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      interview.overallScore >= 8 ? 'bg-green-500' :
                      interview.overallScore >= 6 ? 'bg-blue-500' :
                      interview.overallScore >= 4 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(interview.overallScore / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewProfile;