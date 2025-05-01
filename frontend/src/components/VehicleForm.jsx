import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    model: '',
    year: '',
    plate_number: '',
    road_tax_expiry: ''
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      axios.get(`http://localhost:5000/api/vehicles`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then(res => {
        const vehicle = res.data.find(v => v._id === id);
        if (vehicle) {
          setForm({
            model: vehicle.model,
            year: vehicle.year,
            plate_number: vehicle.plate_number,
            road_tax_expiry: vehicle.road_tax_expiry.slice(0, 10)
          });
        }
      }).catch(() => toast.error('Failed to load vehicle data'));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.model || !form.year || !form.plate_number || !form.road_tax_expiry) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (form.year < 1900 || form.year > new Date().getFullYear()) {
      toast.error("Enter a valid year.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const url = isEditMode
      ? `http://localhost:5000/api/vehicles/${id}`
      : `http://localhost:5000/api/vehicles`;
    const method = isEditMode ? 'put' : 'post';

    try {
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success(`Vehicle ${isEditMode ? 'updated' : 'added'} successfully!`);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      toast.error("Failed to submit vehicle data.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="model" placeholder="Vehicle Model" value={form.model} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="plate_number" placeholder="Plate Number" value={form.plate_number} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="road_tax_expiry" type="date" value={form.road_tax_expiry} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-[#00df9a] hover:bg-[#00c885] text-white px-4 py-2 rounded">
          {isEditMode ? 'Update' : 'Add'} Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;
