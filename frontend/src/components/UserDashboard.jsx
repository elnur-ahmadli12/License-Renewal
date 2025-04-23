import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCar, FaIdCard, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00df9a]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Hoş Geldiniz Banner */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center">
        <div className="bg-[#00df9a] text-white p-4 rounded-full mr-4">
          <FaUser size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Hoş Geldiniz, {userData.user.name} 👋
          </h1>
          <p className="text-gray-600">{userData.user.email}</p>
        </div>
      </div>

      {/* Ehliyet Bilgileri */}
      {userData.license && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaIdCard className="text-[#00df9a] mr-2" size={24} />
            <h2 className="text-xl font-semibold">Ehliyet Bilgileri</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500">Ehliyet Numarası:</label>
              <p className="font-medium">{userData.license.license_number}</p>
            </div>
            <div>
              <label className="text-gray-500">Son Geçerlilik Tarihi:</label>
              <p className="font-medium">
                {new Date(userData.license.expiry_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Araç Listesi */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <FaCar className="text-[#00df9a] mr-2" size={24} />
          <h2 className="text-xl font-semibold">Kayıtlı Araçlar</h2>
        </div>
        
        {userData.vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.vehicles.map((vehicle, index) => (
              <div key={index} className="border-l-4 border-[#00df9a] p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg">{vehicle.plate}</h3>
                <p className="text-gray-600">{vehicle.model}</p>
                <div className="mt-2">
                  <span className="text-sm bg-[#00df9a] text-white px-2 py-1 rounded">
                    Son Yenileme: {new Date(vehicle.tax_due).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Henüz kayıtlı aracınız bulunmamaktadır.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;