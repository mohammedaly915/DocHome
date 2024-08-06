import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      // Check if the email has an associated account
      const checkEmailResponse = await axios.post('https://your-api-url.com/api/check-email', { email });
      if (!checkEmailResponse.data.exists) {
        alert('Email does not exist. Please try again.');
        setLoading(false);
        return;
      }

      // Send OTP if the email exists
      const sendOtpResponse = await axios.post('https://your-api-url.com/api/send-otp', { email });
      const { otp } = sendOtpResponse.data;

      console.log(`Sending OTP ${otp} to ${email}`);

      // Navigate to the verification page with OTP and email
      navigate('/verification', { state: { email, otp } });
    } catch (error) {
      console.error('Error during OTP process', error);
      alert('Failed to process OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='back'>
      <div className='box'>
        <h1>Forget Password</h1>
        <p>Don't worry! Please enter your email address</p>
        <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
          <input
            type='email'
            className='inputs'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type='submit' className='button' disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
