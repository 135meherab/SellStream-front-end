import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllProducts from './Products';
import OrderComponent from './Order';
import Profile from './Profile';

import logo from '../assets/logo.png'



const DashboardPage = () => {
  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <Router>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        <div className="p-4 text-xl font-bold flex justify-center items-center"><img src={logo} alt="logo" width='50' /><h1>SellStream</h1></div>
        <ul className="py-4">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer"><Link to='/products'>Products</Link></li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer"><Link to='/order'>Order</Link></li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Users</li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Reports</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Welcome Mr. / Ms. User</h1>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-1">
            <Routes >
                <Route path="/" element={<Profile />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/order" element={<OrderComponent />} />
            </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
};

export default DashboardPage;
