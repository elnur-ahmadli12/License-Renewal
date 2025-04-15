import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate ekleyin

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    licenseNumber: '',
    licenseExpiry: '',
    vehiclePlate: '',
    vehicleTaxExpiry: '',
  });

  const navigate = useNavigate(); // useNavigate'i kullan

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/save', user);
      alert(response.data.message);
      navigate(`/dashboard/${user.email}`); // Dashboard'a yönlendir
    } catch (err) {
      alert('Error saving profile: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Profile Management</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={user.licenseNumber}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">License Expiry Date</label>
          <input
            type="date"
            name="licenseExpiry"
            value={user.licenseExpiry}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Plate Number</label>
          <input
            type="text"
            name="vehiclePlate"
            value={user.vehiclePlate}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Tax Expiry Date</label>
          <input
            type="date"
            name="vehicleTaxExpiry"
            value={user.vehicleTaxExpiry}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 bg-opacity-50 border border-gray-600 text-white focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-700 transition rounded text-white font-semibold"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;