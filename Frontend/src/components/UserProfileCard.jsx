// components/UserProfileCard.jsx - UPDATED
import { Link } from 'react-router-dom';

const UserProfileCard = ({ profile, rank }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-blue-600 bg-blue-50';
    if (score >= 4) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Header with Rank and Basic Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg truncate max-w-[120px]">
                {profile.name}
              </h3>
              <p className="text-sm text-gray-500 truncate max-w-[120px]">{profile.email}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(profile.averageScore)}`}>
            Rank: {getRankBadge(rank)}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-gray-400">💻</span>
          <span className="text-sm text-gray-700 font-medium truncate">
            {profile.techStack}
          </span>
        </div>

        {/* Experience */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">📊</span>
          <span className="text-sm text-gray-700">{profile.experience}</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6">
        {/* Score Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Interview Score</span>
            <span className="text-sm font-bold text-gray-900">{profile.averageScore}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                profile.averageScore >= 8 ? 'bg-green-500' :
                profile.averageScore >= 6 ? 'bg-blue-500' :
                profile.averageScore >= 4 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${profile.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{profile.totalInterviews}</div>
            <div className="text-xs text-gray-500">Interviews</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{profile.percentage}%</div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 space-y-2">
          {profile.currentRole !== 'Not specified' && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>💼</span>
              <span className="truncate">{profile.currentRole}</span>
            </div>
          )}
          {profile.location !== 'Not specified' && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>📍</span>
              <span>{profile.location}</span>
            </div>
          )}
        </div>

        {/* Join Date */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </p>
        </div>
      </div>

      {/* Action Button - FIXED LINK */}
      <div className="px-6 pb-6">
        <Link 
          to={`/profile/${profile.id}`}
          className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium text-center"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfileCard;