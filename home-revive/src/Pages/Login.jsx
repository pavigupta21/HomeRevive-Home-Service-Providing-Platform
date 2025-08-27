import React from 'react';
import { NavigationBar } from '../components/NavigationBar';
import googleLogo from '../assets/google_logo.png';
import metaLogo from '../assets/meta_logo.png';

export const Login = () => {
  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] relative">
      <NavigationBar />

      {/* Heading Section - Keep As Is */}
      <div className="absolute w-full top-[120px] flex flex-col items-center">
        <h1 className="font-bold text-black text-[40px] text-center">
          Welcome Back
        </h1>
        <p className="font-bold text-[#808080] text-2xl text-center mt-2">
          Sign in to book your home services
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full flex justify-center mt-[200px]">
        <div className="bg-white rounded-[40px] px-10 py-10 shadow-md w-[430px] flex flex-col items-center">

          {/* Email */}
          <div className="mb-4 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[55px]">Email ID</label>
            <input
              type="email"
              placeholder="enter email ID"
              className="w-[250px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Password */}
          <div className="mb-4 w-full flex flex-col items-center">
            <label className="text-black text-base self-start mb-1 ml-[55px]">Password</label>
            <input
              type="password"
              placeholder="enter password"
              className="w-[250px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
            />
          </div>

          {/* Social login */}
          <div className="text-[#625f6b] text-base text-center mb-3">
            Or log in with
          </div>
          <div className="flex justify-center items-center gap-8 mb-6">
            <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
            <img src={metaLogo} alt="Meta logo" className="w-12 h-2" />
          </div>

          

          {/* Sign up */}
          <p className="text-[15px] mb-4">
            <span className="text-black">Don’t Have An Account? </span>
            <a href="#" className="text-[#300dad] hover:underline">Sign Up Here</a>
          </p>
          {/* Terms checkbox */}
          <div className="flex items-center text-[10px] text-black mb-4 w-[340px] whitespace-nowrap">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="leading-4">
              By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
            </label>
          </div>

          {/* Login Button */}
          <button className="w-[150px] h-10 bg-[#5d35ee] text-white rounded-lg text-base font-medium hover:bg-[#472dd1] transition">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
