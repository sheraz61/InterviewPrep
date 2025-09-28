import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white';
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white p-2 rounded-lg transform group-hover:scale-110 transition duration-300">
              <span className="text-blue-600 font-bold text-xl">💼</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">InterviewPrep</h1>
              <p className="text-blue-200 text-xs">Master Your Skills</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/')}`}
            >
              <span className="flex items-center space-x-2">
                <span>🏠</span>
                <span>Home</span>
              </span>
            </Link>
            
           
            
            {isAuthenticated ? (
              <>
               <Link 
              to="/interview" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/interview')}`}
            >
              <span className="flex items-center space-x-2">
                <span>🎤</span>
                <span>Interview</span>
              </span>
            </Link>
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/dashboard')}`}
                >
                  <span className="flex items-center space-x-2">
                    <span>📊</span>
                    <span>Dashboard</span>
                  </span>
                </Link>

                <Link 
                  to="/profile" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/profile')}`}
                >
                  <span className="flex items-center space-x-2">
                    <span>👤</span>
                    <span>My Profile</span>
                  </span>
                </Link>
                
                <span className="text-blue-200 px-4 py-2">
                  Welcome, {user?.name}
                </span>
                
                <button 
                  onClick={handleLogout}
                  className="ml-4 px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center space-x-2">
                    <span>🚪</span>
                    <span>Logout</span>
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/login')}`}
                >
                  <span className="flex items-center space-x-2">
                    <span>🔐</span>
                    <span>Login</span>
                  </span>
                </Link>
                
                <Link 
                  to="/register" 
                  className="ml-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center space-x-2">
                    <span>✨</span>
                    <span>Get Started</span>
                  </span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden bg-white/20 p-3 rounded-lg hover:bg-white/30 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-white text-2xl">
              {isMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-4 animate-fade-in">
            <div className="space-y-2">
              <Link 
                to="/" 
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Home
              </Link>
              
              <Link 
                to="/interview" 
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/interview')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                🎤 Interview Practice
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/dashboard')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    📊 Dashboard
                  </Link>

                  <Link 
                    to="/profile" 
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/profile')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 My Profile
                  </Link>
                  
                  <div className="px-4 py-3 text-blue-200 border-t border-blue-400">
                    Welcome, {user?.name}
                  </div>
                  
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActiveLink('/login')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🔐 Login
                  </Link>
                  
                  <Link 
                    to="/register" 
                    className="block px-4 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✨ Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;