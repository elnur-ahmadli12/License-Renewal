import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  
  // currentUser yerine direkt token kontrolü yapıyoruz
  const token = localStorage.getItem('token');
  
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;