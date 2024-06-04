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
      <ToastContainer/>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/sign_up/" element={<SignUp />}/>
      {/* <Route path="/dashboard/*" element={ <PrivateRoute><DashboardPage/></PrivateRoute> }/> */}
      <Route path="/admin-dashboard/*" element={ <PrivateRoute><AdminDashboardPage/></PrivateRoute> }/>
      <Route path="/shop-dashboard/*" element={ <PrivateRoute><ShopDashboardPage/></PrivateRoute> }/>
      <Route path="/branch-dashboard/*" element={ <PrivateRoute><BranchDashboardPage/></PrivateRoute> }/>
      </Routes>
      </>
  )
}

export default App