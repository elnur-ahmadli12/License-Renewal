import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    licenseNumber: '',
    licenseExpiry: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 0 15px rgba(0, 223, 154, 0.5)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.98
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile');
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 7) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!user.name.trim()) newErrors.name = 'Name is required';
    if (!user.email.includes('@')) newErrors.email = 'Invalid email format';
    if (!user.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!user.licenseExpiry) newErrors.licenseExpiry = 'Expiry date is required';
    if (new Date(user.licenseExpiry) < new Date()) newErrors.licenseExpiry = 'License has expired';
    
    if (user.password && user.password !== user.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      
      Object.keys(user).forEach(key => {
        if (user[key]) formData.append(key, user[key]);
      });
      
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }
      
      const response = await axios.post('http://localhost:5000/api/users/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success(response.data.message);
      navigate(`/dashboard/${user.email}`);
    } catch (err) {
      toast.error(`Error saving profile: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 text-gray-800 p-4 md:p-8"
    >
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-3xl font-bold mb-8 text-gray-900"
      >
        Profile Management
      </motion.h1>

      <motion.form 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit} 
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Column */}
          <motion.div variants={containerVariants} className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-xl font-semibold mb-4 text-gray-700">Personal Information</motion.h2>
            
            <motion.div variants={itemVariants} className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600">Full Name</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #00df9a" }}
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:outline-none`}
                required
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #00df9a" }}
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:outline-none`}
                required
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600">Profile Picture</label>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative overflow-hidden"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 rounded bg-gray-50 border border-gray-300 text-gray-800 opacity-0 absolute inset-0 z-10 cursor-pointer"
                />
                <div className="w-full p-3 rounded bg-gray-50 border border-gray-300 text-gray-500">
                  {profilePicture ? profilePicture.name : 'Choose a file...'}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Driver Information Column */}
          <motion.div variants={containerVariants} className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-xl font-semibold mb-4 text-gray-700">Driver Information</motion.h2>
            
            <motion.div variants={itemVariants} className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600">License Number</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #00df9a" }}
                type="text"
                name="licenseNumber"
                value={user.licenseNumber}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-gray-50 border ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:outline-none`}
                required
              />
              {errors.licenseNumber && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.licenseNumber}
                </motion.p>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600">License Expiry Date</label>
              <motion.input
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #00df9a" }}
                type="date"
                name="licenseExpiry"
                value={user.licenseExpiry}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-gray-50 border ${errors.licenseExpiry ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:outline-none`}
                required
              />
              {errors.licenseExpiry && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.licenseExpiry}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
          
          {/* Password Section (Full width) */}
          <motion.div variants={containerVariants} className="space-y-4 md:col-span-2">
            <motion.h2 variants={itemVariants} className="text-xl font-semibold mb-4 text-gray-700">Password Update</motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-600">New Password</label>
                <motion.input
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #00df9a" }}
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className={`w-full p-3 rounded bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:outline-none`}
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5 }}
                  className="h-1 w-full bg-gray-200 mt-1"
                >
                  <motion.div 
                    className={`h-full ${passwordStrength > 3 ? 'bg-[#00df9a]' : 
                      passwordStrength > 2 ? 'bg-[#00df9a]' : 
                      passwordStrength > 1 ? 'bg-[#00df9a]' : passwordStrength > 0 ? 'bg-[#00df9a]' : ''}`} 
                    animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-600">Confirm Password</label>
                <motion.input
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #00df9a" }}
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-3 rounded bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:outline-none`}
                />
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-6 bg-[#00df9a] hover:bg-[#00c58a] rounded text-white font-semibold relative overflow-hidden"
        >
          {isLoading && (
            <motion.span 
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear"
              }}
              className="absolute top-0 h-full w-1/3 bg-white opacity-20"
            />
          )}
          <span className="relative z-10 flex items-center justify-center">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Profile'}
          </span>
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Profile;