import Login from './Components/Login'
import { Routes, Route,} from 'react-router-dom';
// import DashboardPage2 from './Components/Dashboard/Dashboard2';
import AdminDashboardPage from './Components/AdminDashboard'
import ShopDashboardPage from './Components/ShopDashboard'
import BranchDashboardPage from './Components/BranchDashboard'
import PrivateRoute from './Components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home/Home';
import SignUp from './Components/sign_up';




function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes with Role Checks */}
        <Route path="/admin-dashboard/*" element={<PrivateRoute role= 'isadmin'><AdminDashboardPage/></PrivateRoute> }/>
        <Route path="/shop-dashboard/*" element={<PrivateRoute role="isowner"><ShopDashboardPage/></PrivateRoute> }/> {/* Assuming Shop and Branch use same dashboard */}
        <Route path="/branch-dashboard/*" element={<PrivateRoute role="isbranch"><BranchDashboardPage/></PrivateRoute> }/> {/* Optional: If Shop and Branch have separate dashboards */}
    
      </Routes>
    </>
  );
}

export default App