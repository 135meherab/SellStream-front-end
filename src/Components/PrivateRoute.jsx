import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// export default function PrivateRoute({children}) {
//     const isLoggedIn = useAuth()
//   return (
//     isLoggedIn ? children : <Navigate to="/"/> 
//   )
// }

function PrivateRoute({ children, role}) {
  const getUserInfo = () => {
    try {
      const userInfoString = localStorage.getItem('user_info');
      if (userInfoString) {
        return JSON.parse(userInfoString);
      }
      return null;
    } catch (error) {
      console.error("Error parsing user info from localStorage:", error);
      return null;
    }
  };

  const user = getUserInfo();

  if (!user || user.role !== role) {
    localStorage.removeItem('auth');
    localStorage.removeItem('user_info');
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;