// pages/Interview.jsx - COMPLETELY REDESIGNED
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startInterview, clearInterviewError } from '../store/slices/interviewSlice';

const Interview = () => {
  const [formData, setFormData] = useState({
    technology: '',
    difficulty: 'beginner'
  });
  
  const [selectedTech, setSelectedTech] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.interview);

  const techStackOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'HTML/CSS',
    'TypeScript', 'Vue.js', 'Angular', 'Express.js', 'MongoDB', 'SQL',
    'AWS', 'Docker', 'React Native', 'Next.js', 'GraphQL', 'Redux',
    'PHP', 'Laravel', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Redis'
  ];

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', emoji: '👶', desc: 'Basic concepts and fundamentals' },
    { value: 'intermediate', label: 'Intermediate', emoji: '🚀', desc: 'Practical applications and scenarios' },
    { value: 'advanced', label: 'Advanced', emoji: '🔥', desc: 'Complex problems and architecture' },
    { value: 'expert', label: 'Expert', emoji: '💎', desc: 'Senior-level system design' }
  ];

  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
    setFormData(prev => ({ ...prev, technology: tech }));
    dispatch(clearInterviewError());
  };

  const handleDifficultySelect = (difficulty) => {
    setFormData(prev => ({ ...prev, difficulty }));
    dispatch(clearInterviewError());
  };

  const handleStartInterview = async (e) => {
    e.preventDefault();
    
    if (!formData.technology) {
      dispatch(setError('Please select a technology'));
      return;
    }

    try {
      const result = await dispatch(startInterview(formData)).unwrap();
      
      if (result.success) {
        navigate('/interview-session', { 
          state: { 
            interviewId: result.data.interviewId,
            currentQuestion: result.data.question,
            questionNumber: result.data.questionNumber,
            totalQuestions: result.data.totalQuestions,
            technology: result.data.technology,
            difficulty: result.data.difficulty
          }
        });
      }
    } catch (error) {
      console.error('Failed to start interview:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI-Powered Technical Interview
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Practice real-world technical interviews with AI-powered evaluation. 
            Get instant feedback and improve your skills with personalized questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Setup Form */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Configure Your Interview</h2>
              <p className="text-gray-400">Select your technology and difficulty level</p>
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center">
                <span className="text-lg mr-2">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleStartInterview} className="space-y-8">
              {/* Technology Selection */}
              <div>
                <label className="block text-lg font-semibold mb-4 text-gray-200">
                  <span className="flex items-center space-x-2">
                    <span>💻</span>
                    <span>Select Technology</span>
                  </span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-2">
                  {techStackOptions.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => handleTechSelect(tech)}
                      className={`p-4 border-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                        selectedTech === tech
                          ? 'border-blue-500 bg-blue-500/20 text-blue-300 shadow-lg'
                          : 'border-gray-600 hover:border-gray-500 text-gray-300 bg-gray-700/50'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
                {selectedTech && (
                  <p className="mt-4 text-green-400 flex items-center justify-center">
                    <span className="mr-2">✅</span>
                    Selected: <strong className="ml-1 text-white">{selectedTech}</strong>
                  </p>
                )}
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="block text-lg font-semibold mb-4 text-gray-200">
                  <span className="flex items-center space-x-2">
                    <span>📊</span>
                    <span>Difficulty Level</span>
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {difficultyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleDifficultySelect(option.value)}
                      className={`p-4 border-2 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                        formData.difficulty === option.value
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-lg'
                          : 'border-gray-600 hover:border-gray-500 text-gray-300 bg-gray-700/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.emoji}</div>
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button
                type="submit"
                disabled={loading || !formData.technology}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-2xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Preparing Interview Questions...
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-xl">
                    <span className="mr-3">🚀</span>
                    Start Interview Session
                    <span className="ml-3">🚀</span>
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* What to Expect */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-white">🎯 What to Expect</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">•</span>
                  <span>5 technical questions tailored to your level</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">•</span>
                  <span>Real-time AI evaluation and scoring</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">•</span>
                  <span>Detailed feedback with improvement tips</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-green-400">•</span>
                  <span>No time limits - focus on quality answers</span>
                </div>
              </div>
            </div>

            {/* Tips for Success */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-white">💡 Tips for Success</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">💬</span>
                  <div>
                    <div className="font-semibold text-white">Be Detailed</div>
                    <div className="text-gray-400 text-sm">Provide comprehensive answers with examples</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">⏱️</span>
                  <div>
                    <div className="font-semibold text-white">Take Your Time</div>
                    <div className="text-gray-400 text-sm">Think through your answers carefully</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-400 mt-1">🔍</span>
                  <div>
                    <div className="font-semibold text-white">Review Fundamentals</div>
                    <div className="text-gray-400 text-sm">Brush up on core concepts before starting</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-white">📈 Track Your Progress</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-blue-100 text-sm">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">AI</div>
                  <div className="text-blue-100 text-sm">Evaluation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10</div>
                  <div className="text-blue-100 text-sm">Point Scale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;