import React from 'react';
import { NavigationBar } from '../components/NavigationBar';
import googleLogo from '../assets/google_logo.png';
import metaLogo from '../assets/meta_logo.png';

export const Signup = () => {
  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] relative">
      <NavigationBar />

      {/* Heading Section */}
      <div className="absolute w-full top-[100px] flex flex-col items-center">
        <h1 className="font-bold text-[#300dad] text-[40px] text-center">
          HomeRevive
        </h1>
        <p className="font-bold text-[#300dad] text-3xl text-center mt-0">
          Sign Up
        </p>
      </div>

      {/* Signup Card */}
      <div className="w-full flex justify-center mt-[120px]">
        <div className="bg-white rounded-[40px] px-10 py-8 shadow-md w-[430px] flex flex-col items-center">
          
          {/* Full Name */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Full Name</label>
            <input
              type="text"
              placeholder="first  middle  last"
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Phone Number</label>
            <input
              type="number"
              placeholder="enter phone number"
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Email */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Email ID</label>
            <input
              type="email"
              placeholder="enter email ID"
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Address */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Address</label>
            <input
              type="text"
              placeholder="enter address"
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Username */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Username</label>
            <input
              type="text"
              placeholder="enter username"
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Password */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Password</label>
            <input
              type="password"
              placeholder="enter password"
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-2 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[42px]">Confirm Password</label>
            <input
              type="password"
              placeholder="confirm password"
              className="w-[270px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
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
          <button className="w-[150px] h-10 bg-[#5d35ee] text-white rounded-lg text-base font-medium hover:bg-[#472dd1] transition">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
