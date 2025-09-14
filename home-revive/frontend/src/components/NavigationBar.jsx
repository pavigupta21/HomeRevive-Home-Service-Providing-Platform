
import React, { useState, useEffect } from "react";
import userlogo from '../assets/User.png'; 
import homelogo from '../assets/Homelogo.png';
import doorlogo from '../assets/doorlogo.png';
import star_nav from '../assets/star_nav.png';
import service_nav from '../assets/service_nav.png';
import logout_nav from '../assets/logout_nav.png';
import { Link, useNavigate } from "react-router-dom";
import { authUtils } from '../utils/api';


export const NavigationBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const authenticated = authUtils.isAuthenticated();
      const userData = authUtils.getCurrentUser();
      setIsAuthenticated(authenticated);
      setUser(userData);
    };

    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    authUtils.clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

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
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/aboutus" className="hover:underline">About Us</Link></li>
          <li><Link to="/services" className="hover:underline">Services</Link></li>
          <li><Link to="/rewards" className="hover:underline">Rewards</Link></li>
        </ul>

        {/* Right-side: Login/Signup + User Icon */}
        <div className="relative flex items-center space-x-4 mr-2">
          {!isAuthenticated ? (
            <Link to="/login" className="hover:underline font-bold">Log in/Sign up</Link>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm">Welcome, {user?.name || 'User'}</span>
              <img 
                src={userlogo} 
                alt="User Icon"  
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="h-9 w-9 rounded-full cursor-pointer hover:ring-2 hover:ring-[#5D35EE] hover:ring-offset-2 transition" 
              />
            </div>
          )}
          
          {/* Dropdown Menu - Only show when authenticated */}
          {isAuthenticated && isDropdownOpen && (
            <div className="absolute right-0 mt-[200px] [font-family:'Inter','Regular'] text-[20px] w-[227px] mr-[5px] bg-[#C5B9EF] text-black rounded-[10px] shadow-lg z-50">
              <ul className="flex flex-col divide-y divide-black">
                <li className="px-4 py-3 hover:bg-[#B4A2CB] cursor-pointer flex items-center space-x-2">
                  <img src={star_nav} alt="Reviews" className="h-8 w-8" />
                  <Link to="/reviews" onClick={() => setIsDropdownOpen(false)}>Reviews</Link>
                </li>
                <li className="px-4 py-3 hover:bg-[#B4A2CB] cursor-pointer flex items-center space-x-2">
                  <img src={service_nav} alt="Service History" className="h-6 w-6" />
                  <Link to="/servicehistory" onClick={() => setIsDropdownOpen(false)}>Service History</Link>
                </li>
                <li className="px-4 py-3 hover:bg-[#B4A2CB] cursor-pointer flex items-center space-x-2" onClick={handleLogout}>
                  <img src={logout_nav} alt="Log Out" className="h-7 w-7" />
                  <span>Log Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
