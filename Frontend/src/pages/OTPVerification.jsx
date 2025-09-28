import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  verifyOTP, 
  resendOTP, 
  clearError, 
  startOTPResendCooldown,
  decrementOTPResendCooldown,
  clearPendingEmail
} from '../store/slices/authSlice';
import OTPInput from '../components/OTPInput';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { 
    loading, 
    error, 
    isAuthenticated, 
    pendingEmail,
    otpResendCooldown 
  } = useSelector((state) => state.auth);

  // Get email from location state or Redux store
  const email = location.state?.email || pendingEmail;


  // OTP resend cooldown timer
  useEffect(() => {
    let interval;
    if (otpResendCooldown > 0) {
      interval = setInterval(() => {
        dispatch(decrementOTPResendCooldown());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpResendCooldown, dispatch]);

  useEffect(() => {
    dispatch(clearError());
    
    // Redirect if no email is available
    if (!email) {
      navigate('/register', { 
        replace: true,
        state: { error: 'Please complete registration first' }
      });
      return;
    }

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [dispatch, isAuthenticated, navigate, email]);

  const handleOTPComplete = (enteredOTP) => {
    setOtp(enteredOTP);
    handleVerifyOTP(enteredOTP);
  };

  const handleVerifyOTP = async (enteredOTP = otp) => {
    if (enteredOTP.length !== 4 || !email) {
      dispatch(clearError());
      return;
    }

    try {
      // Send both email and code to backend
      const result = await dispatch(verifyOTP({
        email: email,
        code: enteredOTP
      })).unwrap();
      
      if (result.success) {
        // Clear pending email after successful verification
        dispatch(clearPendingEmail());
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('❌ OTP verification error:', error);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      console.error('❌ No email available for resend');
      return;
    }

    try {
      await dispatch(resendOTP(email)).unwrap();
      dispatch(startOTPResendCooldown());
    } catch (error) {
      console.error('❌ Resend OTP error:', error);
    }
  };

  const handleBackToRegister = () => {
    dispatch(clearError());
    navigate('/register');
  };
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-600">No email found. Please complete registration first.</p>
            <button
              onClick={() => navigate('/register')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Go to Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 4-digit verification code sent to {email}
          </p>
        </div>

        {/* OTP Verification Form */}
        <div className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              {error}
            </div>
          )}

          {location.state?.message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
              {location.state.message}
            </div>
          )}

          <div className="space-y-6">
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter Verification Code
              </label>
              <OTPInput onOTPComplete={handleOTPComplete} />
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={otpResendCooldown > 0 || loading}
                  className="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {otpResendCooldown > 0 ? `Resend in ${otpResendCooldown}s` : 'Resend OTP'}
                </button>
              </p>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleBackToRegister}
                  disabled={loading}
                  className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition duration-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => handleVerifyOTP()}
                  disabled={otp.length !== 4 || loading}
                  className="flex-1 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    'Verify Email'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;