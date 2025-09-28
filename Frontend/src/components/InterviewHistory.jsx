const InterviewHistory = ({ interviews, isPublic = false }) => {
  if (interviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Interviews Yet</h3>
        <p className="text-gray-600">
          {isPublic ? 'This user has not completed any interviews yet.' : 'You have not completed any interviews yet.'}
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
                : interview.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800'
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
          
          {interview.feedback && (
            <div className="mt-3 p-3 bg-white rounded border">
              <p className="text-sm text-gray-700">{interview.feedback}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InterviewHistory;