import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer, getResults } from '../store/slices/interviewSlice';

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.interview);

  const [currentAnswer, setCurrentAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const conversationEndRef = useRef(null);

  const interviewData = location.state;

  useEffect(() => {
    if (!interviewData) {
      navigate('/interview');
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setConversation([{
        type: 'question',
        content: interviewData.currentQuestion,
        questionNumber: interviewData.questionNumber
      }]);
      setIsTyping(false);
    }, 1000);

    textareaRef.current?.focus();
  }, [interviewData, navigate]);

  useEffect(() => {
    // Smooth scroll instead of jump
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [conversation, isTyping]);

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return;

    try {
      const result = await dispatch(submitAnswer({
        interviewId: interviewData.interviewId,
        answer: currentAnswer.trim()
      })).unwrap();

      setConversation(prev => [...prev, {
        type: 'answer',
        content: currentAnswer.trim(),
        questionNumber: interviewData.questionNumber
      }]);

      setCurrentAnswer('');

      if (result.completed) {
        setInterviewCompleted(true);

        setTimeout(() => {
          dispatch(getResults(interviewData.interviewId)).then((result) => {
            if (result.payload.success) {
              navigate('/interview-results', {
                state: { results: result.payload.data }
              });
            }
          });
        }, 2000);
      } else {
        setIsTyping(true);

        setTimeout(() => {
          setConversation(prev => [...prev, {
            type: 'question',
            content: result.data.nextQuestion,
            questionNumber: result.data.questionNumber
          }]);
          setIsTyping(false);
          interviewData.questionNumber = result.data.questionNumber;
        }, 1500);
      }

    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmitAnswer();
    }
  };

  const exitInterview = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      navigate('/interview');
    }
  };

  if (!interviewData) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/60 backdrop-blur-md border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            🤖
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Interview Session</h1>
            <p className="text-xs text-gray-400">
              {interviewData.technology} • {interviewData.difficulty} • Question {interviewData.questionNumber} / {interviewData.totalQuestions}
            </p>
          </div>
        </div>
        <button
          onClick={exitInterview}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          Exit
        </button>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-slate-950/40">
        {conversation.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === 'question' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xl px-4 py-3 rounded-2xl shadow-md ${
                msg.type === 'question'
                  ? 'bg-slate-800 text-gray-100 rounded-bl-none'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none'
              }`}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none text-gray-300 flex gap-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}

        {interviewCompleted && (
          <div className="flex justify-center">
            <div className="bg-green-500/80 px-6 py-4 rounded-xl text-white text-center shadow-lg">
              🎉 Interview Completed! Processing your results...
            </div>
          </div>
        )}
        <div ref={conversationEndRef} />
      </div>

      {/* Input */}
      {!interviewCompleted && (
        <div className="bg-slate-800/60 backdrop-blur-md border-t border-slate-700 px-6 py-4">
          {error && (
            <div className="bg-red-500/20 text-red-200 text-sm px-3 py-2 rounded mb-2">
              ⚠ {error}
            </div>
          )}

          <div className="flex gap-3">
            <textarea
              ref={textareaRef}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer... (Ctrl+Enter to send)"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              rows={3}
              disabled={loading}
            />
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || !currentAnswer.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 px-5 py-3 rounded-lg font-semibold transition text-white"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSession;
