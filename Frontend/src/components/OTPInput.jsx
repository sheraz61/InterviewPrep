import { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 4, onOTPComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Submit OTP when all fields are filled
    if (newOtp.every(digit => digit !== '')) {
      onOTPComplete(newOtp.join(''));
    }

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    if (!isNaN(pasteData)) {
      const newOtp = pasteData.split('').concat(new Array(length - pasteData.length).fill(''));
      setOtp(newOtp);
      onOTPComplete(pasteData);
    }
  };

  return (
    <div className="flex justify-center space-x-3" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(ref) => (inputRefs.current[index] = ref)}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-16 h-16 text-3xl text-center font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
        />
      ))}
    </div>
  );
};

export default OTPInput;