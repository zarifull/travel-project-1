import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user?.role === 'admin' ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
