import React from "react";
import userlogo from '../assets/User.png'; 
import homelogo from '../assets/Homelogo.png';
import doorlogo from '../assets/doorlogo.png';

export const NavigationBar = () => {
  return (
    <nav className="bg-[#5d3fee] text-white px-8 py-5 shadow-md">
      <div className="max-w-8xl mx-auto flex justify-between items-center">

        {/* Logo + Brand Name (Grouped) */}
        <div className="flex items-center space-x-2 ml-1">
          
          {/* Relative wrapper for house + door */}
          <div className="relative h-12 w-12">
            <img src={homelogo} alt="Home Logo" className="h-12 w-12 rounded-full" />
            <img
              src={doorlogo}
              alt="Door Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/12 h-4 w-5"
            />
          </div>

          <div>
            <div className="text-xl font-bold leading-tight">HomeRevive</div>
            <span className="text-sm -mt-1 block">Home Services</span>
          </div>
        </div>

        {/* Center Menu */}
        <ul className="flex space-x-12">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Services</a></li>
          <li><a href="#" className="hover:underline">Rewards</a></li>
        </ul>

        {/* Right-side: Login/Signup + User Icon */}
        <div className="flex items-center space-x-4 mr-2">
          <a href="#" className="hover:underline font-bold">Log in/Sign up</a>
          <img src={userlogo} alt="User Icon" className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </nav>
  );
};
