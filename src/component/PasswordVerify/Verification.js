import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Verification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    // Start the timer when the component mounts
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) { // Ensure the value is a single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next input if available
      if (index < inputRefs.current.length - 1 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    try {
      const response = await axios.post('https://your-api-url.com/api/verify-otp', { email, otp: enteredOtp });
      if (response.data.success) {
        navigate('/newpassword');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
      alert('Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post('https://your-api-url.com/api/send-otp', { email });
      const { otp } = response.data;
      console.log(`Resending OTP ${otp} to ${email}`);
      setOtp(['', '', '', '']);
      inputRefs.current[0].focus();
      setTimer(60); // Reset timer
    } catch (error) {
      console.error('Error resending OTP', error);
      alert('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className='back'>
      <div className='box'>
        <h1>Verification</h1>
        <p>To get a new password, please check your email <Link to="/forget">Change Email</Link></p>
        <form onSubmit={handleSubmit}>
          <div className='inputs-group'>
            {otp.map((digit, index) => (
              <input
                key={index}
                type='text'
                className='input-verify'
                placeholder='-'
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => inputRefs.current[index] = el}
                maxLength={1}
              />
            ))}
          </div>
          <p>{`00:${timer < 10 ? `0${timer}` : timer}s`}</p>
          <p>Don’t receive code? <span onClick={handleResendOtp} style={{ cursor: 'pointer', color: '#007bff' }}>Re-send</span> </p>
          <button type='submit' className='button'>Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
