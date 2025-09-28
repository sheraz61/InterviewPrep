import { useLocation, useNavigate } from 'react-router-dom';

const InterviewResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    navigate('/interview');
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 4) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-blue-100';
    if (score >= 4) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white">📊</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Interview Results</h1>
          <p className="text-xl text-gray-600">Your performance analysis</p>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Score Overview */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(results.overallScore)} mb-4`}>
              <span className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
                {results.overallScore}/10
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Score</h2>
            <p className="text-gray-600">
              {results.technology} • {results.difficulty} • {results.totalQuestions} questions
            </p>
          </div>

          {/* Feedback */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Feedback</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{results.feedback}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{results.percentage}%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.totalQuestions}</div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 capitalize">{results.difficulty}</div>
              <div className="text-gray-600">Difficulty Level</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/interview')}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Practice Another Interview
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              View My Profile
            </button>
          </div>
        </div>

        {/* Tips for Improvement */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tips for Improvement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">💡</span>
              <div>
                <h4 className="font-semibold text-gray-900">Study Fundamentals</h4>
                <p className="text-gray-600 text-sm">Focus on core concepts and principles</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-xl">📚</span>
              <div>
                <h4 className="font-semibold text-gray-900">Practice Regularly</h4>
                <p className="text-gray-600 text-sm">Consistent practice improves retention</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-xl">🎯</span>
              <div>
                <h4 className="font-semibold text-gray-900">Target Weak Areas</h4>
                <p className="text-gray-600 text-sm">Identify and work on specific challenges</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-xl">⏱️</span>
              <div>
                <h4 className="font-semibold text-gray-900">Time Management</h4>
                <p className="text-gray-600 text-sm">Practice answering within time limits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;