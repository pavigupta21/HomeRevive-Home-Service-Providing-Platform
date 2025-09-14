import React, { useState } from 'react';
import { NavigationBar } from '../components/NavigationBar';
import googleLogo from '../assets/google_logo.png';
import metaLogo from '../assets/meta_logo.png';
import {Link, useNavigate} from 'react-router-dom';
import { authAPI, authUtils } from '../utils/api';

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');

      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      const response = await authAPI.signup(signupData);
      
      // Store auth data
      authUtils.setAuthData(response.data.user, response.data.token);
      
      setSuccess('Signup successful! Redirecting...');
      
      // Redirect to home page after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] relative">
      <NavigationBar />

      {/* Heading Section */}
      <div className="absolute w-full top-[100px] flex flex-col items-center">
        <h1 className="font-bold text-[#300dad] text-[40px] text-center">
          HomeRevive
        </h1>
      </div>

      {/* Signup Card */}
      
      <div className="w-full flex justify-center mt-[120px]">
        
        <div className="bg-white rounded-[40px] px-10 py-8 shadow-md w-[430px] flex flex-col items-center mb-[30px]">
          <p className="font-bold text-[#300dad] text-3xl text-center mb-[10px]">
          Sign Up
        </p>

        {/* Error/Success Messages */}
        {error && (
          <div className="w-[350px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        {success && (
          <div className="w-[350px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="w-full">
          
          {/* Full Name */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="first  middle  last"
              value={formData.name}
              onChange={handleInputChange}
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Email */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Email ID *</label>
            <input
              type="email"
              name="email"
              placeholder="enter email ID"
              value={formData.email}
              onChange={handleInputChange}
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Address</label>
            <input
              type="text"
              name="address"
              placeholder="enter address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Username */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Username</label>
            <input
              type="text"
              name="username"
              placeholder="enter username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Password */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Password *</label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
              required
            />
          </div>

          {/* Social login */}
          <div className="text-[#625f6b] text-base text-center mb-2">
            Or sign up with
          </div>
          <div className="flex justify-center items-center gap-6 mb-2">
            <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
            <img src={metaLogo} alt="Meta logo" className="w-12 h-2" />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center text-[10px] text-black mb-3 w-[340px] whitespace-nowrap">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="leading-4">
              By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
            </label>
          </div>

          {/* Sign up Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`text-center w-[150px] py-[10px] text-white rounded-lg text-base font-medium transition ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#5d35ee] hover:bg-[#472dd1]'
            }`}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};
