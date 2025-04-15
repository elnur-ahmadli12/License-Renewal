import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Bgimage from "../assets/traffic.jpg";

const LoginSignup = () => {
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

  // Form alanlarını sıfırla
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

  // Mouse dışına tıklama kontrolü
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

  const handleLogin = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      // Proceed with login
      console.log("Login successful");
    }
  };

  const handleSignUp = () => {
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
      // Proceed with sign up
      console.log("Sign up successful");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Bgimage})` }}
    >
      <div className="relative w-[800px] h-[500px] bg-gray-900 bg-opacity-50 shadow-2xl rounded-lg overflow-hidden flex">
        {/* Left Section */}
        <motion.div
          className={`w-2/5 flex flex-col justify-center items-center p-6 transition-all duration-500 ${isSignUp ? 'order-2' : 'order-1'}`}
          initial={{ opacity: 0, x: isSignUp ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isSignUp ? 100 : -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-white">Welcome</h2>
          <p className="text-white mt-4">{isSignUp ? "Already have an account?" : "If you don't have an account"}</p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-4 px-6 py-2 border border-white rounded bg-transparent text-white hover:bg-white hover:text-black transition"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </motion.div>

        {/* Right Section */}
        <div className={`w-3/5 flex flex-col justify-center items-center p-6 transition-all duration-500 ${isSignUp ? 'order-1' : 'order-2'}`}>
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              // Login Form
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-xs"
              >
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full p-3 mb-4 rounded bg-gray-800 bg-opacity-50 border ${emailError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-blue-400`}
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
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full p-3 rounded bg-gray-800 bg-opacity-50 border ${passwordError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-blue-400`}
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
                    className="absolute right-3 top-4 text-gray-400"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-white">Remember Me</label>
                  </div>
                  <button
                    className="text-blue-400 hover:text-blue-300 text-sm"
                    onClick={() => console.log("Forgot Password clicked")}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button
                  className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-700 transition rounded text-white font-semibold"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button className="mt-4 w-full flex items-center justify-center text-white border border-white py-2 rounded hover:bg-white hover:text-black transition">
                  <FaGoogle className="mr-2" /> Connect to Google
                </button>
              </motion.div>
            ) : (
              // Sign Up Form
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-xs"
              >
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 mb-4 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:border-blue-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full p-3 mb-4 rounded bg-gray-700 bg-opacity-50 border ${emailError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-blue-400`}
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
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                <div className="relative" ref={passwordRef}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full p-3 rounded bg-gray-700 bg-opacity-50 border ${passwordError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-blue-400`}
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
                    className="absolute right-3 top-4 text-gray-400"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <AnimatePresence>
                  {showPasswordRequirements && (
                    <motion.ul
                      className="text-sm mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {passwordRequirements.map((req, index) => (
                        <li
                          key={index}
                          className={req.isValid ? "text-green-400" : "text-red-400"}
                        >
                          {req.text}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full p-3 mt-4 rounded bg-gray-700 bg-opacity-50 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-600'} text-white focus:outline-none focus:border-blue-400`}
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
                  <p className="text-red-500 text-sm">{confirmPasswordError}</p>
                )}
                <button
                  className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-700 transition rounded text-white font-semibold"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;