import Login from './Components/Login'
import { Routes, Route,} from 'react-router-dom';
import DashboardPage from './Components/Dashboard';
import PrivateRoute from './Components/PrivateRoute';


function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Login />}/>
      <Route path="/dashboard/*" element={ <PrivateRoute><DashboardPage /></PrivateRoute> }/>
      </Routes>
  )
}

export default App