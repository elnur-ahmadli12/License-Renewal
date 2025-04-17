import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddVehicleForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plateNumber: '',
    model: '',
    taxDueDate: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasyon
    if (!formData.plateNumber || !formData.taxDueDate) {
      setError('Plaka ve vergi tarihi zorunludur!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/vehicles/add',
        {
          userId: user.id,
          plateNumber: formData.plateNumber.toUpperCase(),
          model: formData.model,
          taxDueDate: formData.taxDueDate
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess(response.data.message);
      setError('');
      setFormData({ plateNumber: '', model: '', taxDueDate: '' });
      setTimeout(() => navigate('/dashboard'), 2000); // Başarılıysa yönlendir

    } catch (err) {
      setError(err.response?.data?.error || 'Bir hata oluştu');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Araç Ekle</h2>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Plaka*</label>
          <input
            type="text"
            value={formData.plateNumber}
            onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="34ABC123"
            maxLength="10"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Toyota Corolla"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Vergi Son Tarihi*</label>
          <input
            type="date"
            value={formData.taxDueDate}
            onChange={(e) => setFormData({...formData, taxDueDate: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default AddVehicleForm;