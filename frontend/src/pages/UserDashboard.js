import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiFileText, FiTruck, FiLogOut, FiUser, FiTrash2, FiEdit2 } from 'react-icons/fi';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verileri çekme fonksiyonu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Tarih formatlama işlemleri
        const formattedData = {
          ...response.data,
          license: response.data.license ? {
            ...response.data.license,
            expiry_date: new Date(response.data.license.expiry_date).toLocaleDateString('tr-TR')
          } : null,
          vehicles: response.data.vehicles.map(vehicle => ({
            ...vehicle,
            road_tax_expiry: new Date(vehicle.road_tax_expiry).toLocaleDateString('tr-TR')
          }))
        };

        setUserData(formattedData);
      } catch (error) {
        console.error('Veri çekilemedi:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Araç silme fonksiyonu
  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${vehicleId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setUserData(prev => ({
        ...prev,
        vehicles: prev.vehicles.filter(vehicle => vehicle.id !== vehicleId)
      }));
    } catch (error) {
      console.error('Araç silme hatası:', error);
    }
  };

  // Belge yükleme fonksiyonu
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('document', file);

    try {
      await axios.post('http://localhost:5000/api/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Belge başarıyla yüklendi!');
    } catch (error) {
      alert('Belge yüklenemedi!');
    }
  };

  // Yükleme durumu
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  // Hata durumu
  if (!userData) return (
    <div className="p-4 text-red-500 text-center mt-8">
      Veri alınamadı! Lütfen tekrar deneyin.
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-emerald-600 text-white">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-xl"
          aria-label="Menüyü Aç/Kapat"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="w-6"></div>
      </div>

      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-emerald-600 text-white flex flex-col`}>
        <div className="p-6 border-b border-emerald-500">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-full">
              <FiUser className="text-xl" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{userData.user.name}</h2>
              <p className="text-sm text-emerald-100">{userData.user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-emerald-500 mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="flex items-center justify-center w-full p-3 bg-red-500 hover:bg-red-600 rounded-lg transition"
          >
            <FiLogOut className="mr-2" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 overflow-auto p-6">
        {/* Acil Uyarılar */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <h3 className="text-red-800 font-bold mb-2">⏳ Yaklaşan Son Tarihler</h3>
          <div className="space-y-1">
            {userData.license && (
              <p className="text-red-600">
                Ehliyet Son Geçerlilik: {userData.license.expiry_date}
              </p>
            )}
            {userData.vehicles.map(vehicle => (
              <p key={vehicle.id} className="text-red-600">
                {vehicle.plate_number} Vergi Bitiş: {vehicle.road_tax_expiry}
              </p>
            ))}
          </div>
        </div>

        {/* Hızlı Eylemler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/renew-license')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg transition flex items-center justify-center"
          >
            📝 Ehliyet Yenile
          </button>
          <button
            onClick={() => navigate('/add-vehicle')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition flex items-center justify-center"
          >
            🚗 Yeni Araç Ekle
          </button>
          <button
            onClick={() => document.getElementById('fileInput').click()}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition flex items-center justify-center"
          >
            📁 Belge Yükle
          </button>
          <input type="file" id="fileInput" hidden onChange={handleFileUpload} />
        </div>

        {/* Ana İçerik Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ehliyet Bilgileri */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <FiFileText className="text-emerald-600 mr-2 text-xl" />
              <h2 className="text-lg font-semibold">Ehliyet Bilgileri</h2>
            </div>
            {userData.license ? (
              <div className="space-y-2">
                <p><span className="font-medium">Numara:</span> {userData.license.license_number}</p>
                <p><span className="font-medium">Son Geçerlilik:</span> {userData.license.expiry_date}</p>
                <button
                  onClick={() => navigate('/renew-license')}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Yenileme Yap →
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Ehliyet bilgisi bulunamadı</p>
            )}
          </div>

          {/* Araç Listesi */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <FiTruck className="text-emerald-600 mr-2 text-xl" />
              <h2 className="text-lg font-semibold">Kayıtlı Araçlar</h2>
            </div>
            {userData.vehicles.length > 0 ? (
              <div className="space-y-4">
                {userData.vehicles.map(vehicle => (
                  <div key={vehicle.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{vehicle.model}</p>
                        <p className="text-sm text-gray-500">{vehicle.year}</p>
                      </div>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-mono">
                        {vehicle.plate_number}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Vergi Bitiş:</span> {vehicle.road_tax_expiry}
                      </p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Kayıtlı araç bulunamadı</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;