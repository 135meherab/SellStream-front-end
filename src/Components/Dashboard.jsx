import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllProducts from './Products';
import OrderComponent from './Order';





const DashboardPage = () => {
  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <Router>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        <div className="p-4 text-xl font-bold">Admin Dashboard</div>
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
          <h1 className="text-lg font-semibold text-center">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-1">
            <Routes >
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
