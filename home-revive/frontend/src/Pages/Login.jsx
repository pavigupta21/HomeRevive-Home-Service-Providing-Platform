import React, { useState } from 'react';
import { NavigationBar } from '../components/NavigationBar';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, authUtils } from '../utils/api';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sdkReady, setSdkReady] = useState({ google: false });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Google callback
  const handleGoogleCallbackResponse = async (resp) => {
    try {
      if (!acceptedTerms) {
        setError('You must agree to the Terms of Service and Privacy Policy');
        return;
      }
      if (!resp.credential) {
        setError("Google login failed: No credential received");
        return;
      }

      setIsSubmitting(true);
      setError("");

      const response = await authAPI.oauthGoogle(resp.credential);
      authUtils.setAuthData(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load Google SDK
  React.useEffect(() => {
    // Google Identity Services
    const loadGoogle = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) return;

      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallbackResponse,
        });

        // Render Google button
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
        setSdkReady((s) => ({ ...s, google: true }));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCallbackResponse,
          });
          window.google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large" }
          );
          setSdkReady((s) => ({ ...s, google: true }));
        }
      };
      document.body.appendChild(script);
    };
    loadGoogle();
  }, []);

  

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!acceptedTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');

      const response = await authAPI.login(formData);
      
      // Store auth data
      authUtils.setAuthData(response.data.user, response.data.token);
      
      setSuccess('Login successful! Redirecting...');
      
      // Redirect to home page after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] relative">
      <NavigationBar />

      {/* Heading Section */}
      <div className="absolute w-full top-[120px] flex flex-col items-center">
        <h1 className="font-bold text-black text-[40px] text-center">
          Welcome Back
        </h1>
        <p className="font-bold text-[#808080] text-2xl text-center mt-2">
          Log in to book your home services
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full flex justify-center mt-[180px]">
        <div className="bg-white rounded-[40px] px-10 py-10 shadow-md w-[430px] flex flex-col items-center">
          <p className="font-bold text-[#300dad] text-3xl text-center mb-[20px]">
            Login
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

          <form onSubmit={handleLogin} className="w-full">
            {/* Email */}
            <div className="mb-4 w-full flex flex-col items-center">
              <label className="text-black text-base self-start mb-1 ml-[55px]">Email ID</label>
              <input
                type="email"
                name="email"
                placeholder="enter email ID"
                value={formData.email}
                onChange={handleInputChange}
                className="w-[250px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 w-full flex flex-col items-center">
              <label className="text-black text-base self-start mb-1 ml-[55px]">Password</label>
              <input
                type="password"
                name="password"
                placeholder="enter password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-[250px] h-8 bg-[#d9d9d9] rounded-[10px] px-2"
                required
              />
            </div>

            {/* Social login */}
            <div className="text-[#625f6b] text-base text-center mb-3">
              Or log in with
            </div>
            <div className="flex justify-center items-center gap-8 mb-6">
              {/* Google button rendered by Google SDK */}
              <div id="googleSignInDiv"></div>
            </div>

            {/* Sign up */}
            <p className="text-[15px] mb-4 text-center">
              <span className="text-black">Don’t Have An Account? </span>
              <Link to="/signup" className="text-[#300dad] hover:underline">Sign Up Here</Link>
            </p>

            {/* Terms checkbox */}
            <div className="flex items-center text-[10px] text-black mb-4 w-[340px] whitespace-nowrap">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="leading-4">
                By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
              </label>
            </div>

            {/* Login Button */}
            <div className="w-full flex justify-center">
              <button 
                type="submit"
                disabled={isSubmitting || !acceptedTerms}
                className={`w-[150px] text-center py-[10px] text-white rounded-lg text-base font-medium transition ${
                  isSubmitting || !acceptedTerms
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#5d35ee] hover:bg-[#472dd1]'
                }`}
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
