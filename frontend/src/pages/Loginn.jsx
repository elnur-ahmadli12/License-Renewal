import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Bgimage from "../assets/traffic.jpg";
import axios from 'axios';
const API_URL = "http://localhost:5000/api/auth";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState([
    { text: "At least 8 characters", isValid: false },
    { text: "At least one uppercase letter", isValid: false },
    { text: "At least one lowercase letter", isValid: false },
    { text: "At least one number", isValid: false },
    { text: "At least one special character", isValid: false },
  ]);

  const passwordRef = useRef(null);

  useEffect(() => {
    if (isSignUp) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setShowPasswordRequirements(false);
    } else {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  }, [isSignUp]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passwordRef.current && !passwordRef.current.contains(event.target)) {
        setShowPasswordRequirements(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (pwd) => {
    const requirements = [
      { text: "At least 8 characters", isValid: pwd.length >= 8 },
      { text: "At least one uppercase letter", isValid: /[A-Z]/.test(pwd) },
      { text: "At least one lowercase letter", isValid: /[a-z]/.test(pwd) },
      { text: "At least one number", isValid: /\d/.test(pwd) },
      { text: "At least one special character", isValid: /[@$!%*?&]/.test(pwd) },
    ];
    setPasswordRequirements(requirements);
    return requirements.every((req) => req.isValid);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
  
      if (!response.data.token) {
        alert("Token alınamadı!");
        return;
      }
  
      localStorage.setItem('token', response.data.token);
      navigate('/UserDashboard');
  
    } catch (error) {
      alert(error.response?.data?.error || "Sunucu hatası!");
    }
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    let isValid = true;
    
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password does not meet requirements");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      try {
        const response = await axios.post(`${API_URL}/register`, {
          name: name,
          email: email,
          password: password
        });
        
        alert(response.data.message);
        setIsSignUp(false);
        
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error || "Kayıt başarısız!");
        } else {
          alert("Sunucuyla bağlantı kurulamadı!");
        }
      }
    }
  };

  axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.withCredentials = true;
    }
    return config;
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed p-4 md:p-8"
      style={{ backgroundImage: `url(${Bgimage})` }}
    >
      <div className="relative w-full max-w-6xl h-auto md:h-[550px] bg-gray-900 bg-opacity-70 shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Welcome Section - Side on desktop, top on mobile */}
        <motion.div
          className={`w-full md:w-2/5 flex flex-col justify-center items-center p-8 ${isSignUp ? 'md:order-2' : 'md:order-1'} bg-gray-800 bg-opacity-60`}
          initial={{ opacity: 0, x: isSignUp ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-6 text-center"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isSignUp ? "Welcome Back!" : "Join Us!"}
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-lg mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isSignUp ? "Optimize your tax processes with Tax Road’s expert solutions." : "Start your tax journey with Tax Road – smarter, faster, and stress-free."}
          </motion.p>
          <motion.button
            onClick={() => setIsSignUp(!isSignUp)}
            className="px-8 py-3 rounded-full bg-transparent border-2 border-[#00df9a] text-white hover:bg-[#00df9a] hover:text-gray-900 transition-all duration-300 font-medium text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSignUp ? "SIGN IN" : "SIGN UP"}
          </motion.button>
        </motion.div>

        {/* Form Section */}
        <div className={`w-full md:w-3/5 flex flex-col justify-center items-center p-6 md:p-10 ${isSignUp ? 'md:order-1' : 'md:order-2'}`}>
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              // Login Form
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-md"
              >
                <motion.h2 
                  className="text-3xl font-bold text-center mb-8 text-white"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                >
                  Login to Account
                </motion.h2>
                
                <div className="space-y-5">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className={`w-full p-4 rounded-lg bg-gray-700 bg-opacity-70 border ${emailError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (!e.target.value) {
                          setEmailError("Email is required");
                        } else if (!validateEmail(e.target.value)) {
                          setEmailError("Please enter a valid email address");
                        } else {
                          setEmailError("");
                        }
                      }}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      className={`w-full p-4 rounded-lg bg-gray-700 bg-opacity-70 border ${passwordError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (!e.target.value) {
                          setPasswordError("Password is required");
                        } else {
                          setPasswordError("");
                        }
                      }}
                    />
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      type="button"
                    >
                      {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-[#00df9a] rounded focus:ring-[#00df9a]" />
                      <span>Remember me</span>
                    </label>
                    <button className="text-[#00df9a] hover:text-[#00c789] text-sm font-medium">
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    className="w-full py-4 bg-[#00df9a] hover:bg-[#00c789] text-gray-900 font-bold rounded-lg transition-all duration-300"
                    onClick={handleLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    LOGIN
                  </motion.button>

                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 border-t border-gray-600"></div>
                    <span className="relative bg-gray-800 px-4 text-gray-400 text-sm">OR</span>
                  </div>

                  <button className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300">
                    <FaGoogle className="text-red-500" size={18} />
                    <span className="text-white font-medium">Continue with Google</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              // Sign Up Form
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-md"
              >
                <motion.h2 
                  className="text-3xl font-bold text-center mb-8 text-white"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                >
                  Create Account
                </motion.h2>
                
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-4 rounded-lg bg-gray-700 bg-opacity-70 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className={`w-full p-4 rounded-lg bg-gray-700 bg-opacity-70 border ${emailError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (!e.target.value) {
                          setEmailError("Email is required");
                        } else if (!validateEmail(e.target.value)) {
                          setEmailError("Please enter a valid email address");
                        } else {
                          setEmailError("");
                        }
                      }}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  </div>

                  <div className="relative" ref={passwordRef}>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      className={`w-full p-4 rounded-lg bg-gray-700 bg-opacity-70 border ${passwordError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                        if (!e.target.value) {
                          setPasswordError("Password is required");
                        } else if (!validatePassword(e.target.value)) {
                          setPasswordError("Password does not meet requirements");
                        } else {
                          setPasswordError("");
                        }
                      }}
                      onFocus={() => setShowPasswordRequirements(true)}
                    />
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      type="button"
                    >
                      {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                  </div>

                  <AnimatePresence>
                    {showPasswordRequirements && (
                      <motion.ul
                        className="text-xs sm:text-sm mt-1 space-y-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {passwordRequirements.map((req, index) => (
                          <li
                            key={index}
                            className={`flex items-center ${req.isValid ? "text-green-400" : "text-red-400"}`}
                          >
                            <span className="mr-2">
                              {req.isValid ? "✓" : "✗"}
                            </span>
                            {req.text}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <div>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className={`w-full p-4 rounded-lg bg-gray-700 bg-opacity-70 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent`}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (e.target.value !== password) {
                          setConfirmPasswordError("Passwords do not match");
                        } else {
                          setConfirmPasswordError("");
                        }
                      }}
                    />
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-[#00df9a] hover:bg-[#00c789] text-gray-900 font-bold rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    SIGN UP
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;