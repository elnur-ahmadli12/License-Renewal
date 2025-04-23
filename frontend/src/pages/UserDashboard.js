import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiFileText, FiTruck, FiLogOut, FiUser, FiTrash2, FiEdit2 } from 'react-icons/fi';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data fetching function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const formattedData = {
          ...response.data,
          license: response.data.license ? {
            ...response.data.license,
            expiry_date: new Date(response.data.license.expiry_date).toLocaleDateString('en-US')
          } : null,
          vehicles: response.data.vehicles.map(vehicle => ({
            ...vehicle,
            road_tax_expiry: new Date(vehicle.road_tax_expiry).toLocaleDateString('en-US')
          }))
        };

        setUserData(formattedData);
      } catch (error) {
        console.error('Data fetch failed:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Vehicle deletion handler
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
      console.error('Vehicle deletion error:', error);
    }
  };

  // Document upload handler
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
      alert('Document uploaded successfully!');
    } catch (error) {
      alert('Document upload failed!');
    }
  };

  // Loading state
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00df9a]"></div>
    </div>
  );

  // Error state
  if (!userData) return (
    <div className="p-4 text-red-500 text-center mt-8">
      Failed to load data! Please try again.
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-[#00df9a] text-white shadow-lg">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl hover:scale-110 transition-transform"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold tracking-wide">User Dashboard</h1>
        <div className="w-6"></div>
      </div>

      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'absolute inset-0 z-50' : 'hidden'} md:block w-full md:w-72 bg-gray-800 text-white flex flex-col shadow-xl`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="bg-[#00df9a] p-3 rounded-xl shadow">
              <FiUser className="text-2xl" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-100">{userData.user.name}</h2>
              <p className="text-sm text-gray-400">{userData.user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="flex items-center justify-center w-full p-3 bg-[#00df9a] hover:bg-[#00c885] text-white rounded-xl transition-all shadow hover:shadow-lg"
          >
            <FiLogOut className="mr-2 transform hover:rotate-180 transition-transform" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Urgent Alerts */}
        <div className="bg-[#00df9a]/10 border-l-4 border-[#00df9a] p-4 mb-6 rounded-lg shadow-sm">
          <h3 className="text-gray-800 font-bold mb-2 flex items-center">
            <FiFileText className="mr-2 text-[#00df9a]" />⏳ Upcoming Deadlines
          </h3>
          <div className="space-y-1">
            {userData.license && (
              <p className="text-gray-700">
                License Expiry: {userData.license.expiry_date}
              </p>
            )}
            {userData.vehicles.map(vehicle => (
              <p key={vehicle.id} className="text-gray-700">
                {vehicle.plate_number} Tax Expiry: {vehicle.road_tax_expiry}
              </p>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { title: 'Renew License', icon: '📝', color: 'bg-[#00df9a]', action: '/renew-license' },
            { title: 'Add Vehicle', icon: '🚗', color: 'bg-gray-800', action: '/add-vehicle' },
            { title: 'Upload Document', icon: '📁', color: 'bg-[#00df9a]', action: 'fileInput' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => item.action === 'fileInput' 
                ? document.getElementById('fileInput').click() 
                : navigate(item.action)}
              className={`${item.color} hover:${item.color === 'bg-gray-800' ? 'bg-gray-900' : 'bg-[#00c885]'} text-white p-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
          <input type="file" id="fileInput" hidden onChange={handleFileUpload} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* License Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#00df9a] hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <FiFileText className="text-[#00df9a] mr-2 text-2xl" />
              <h2 className="text-lg font-semibold text-gray-800">License Details</h2>
            </div>
            {userData.license ? (
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-medium">Number:</span> {userData.license.license_number}</p>
                <p className="text-gray-600"><span className="font-medium">Expiry Date:</span> {userData.license.expiry_date}</p>
                <button
                  onClick={() => navigate('/renew-license')}
                  className="mt-4 text-[#00df9a] hover:text-[#00c885] font-medium flex items-center"
                >
                  Renew Now <span className="ml-2">→</span>
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No license information found</p>
            )}
          </div>

          {/* Vehicle List */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#00df9a] hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <FiTruck className="text-[#00df9a] mr-2 text-2xl" />
              <h2 className="text-lg font-semibold text-gray-800">Registered Vehicles</h2>
            </div>
            {userData.vehicles.length > 0 ? (
              <div className="space-y-4">
                {userData.vehicles.map(vehicle => (
                  <div key={vehicle.id} className="border p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{vehicle.model}</p>
                        <p className="text-sm text-gray-500">{vehicle.year}</p>
                      </div>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-mono text-gray-700">
                        {vehicle.plate_number}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Tax Expiry:</span> {vehicle.road_tax_expiry}
                      </p>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="text-gray-500 hover:text-[#00df9a] transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}
                        className="text-gray-500 hover:text-[#00df9a] transition-colors"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No registered vehicles found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;