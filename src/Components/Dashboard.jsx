import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllProducts from './Products';
import OrderComponent from './Order';
import { FaHome, FaBox, FaTags, FaChartBar, FaClipboardList, FaUsers, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import logo from '../assets/logo.png'
import DashboardRoute from './DashboradRoute';
import Employee from './Employee';
import Categories from './Categories';
import Customer from './Customer';
import Reports from './Reports';
import Sales from './Sales';
import Purchase from './Purchase';
import Uom from './Uom.';



const DashboardPage = () => {
  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <Router>
    <div className="flex h-screen">
   

{/* Sidebar */}
<div className="bg-gray-800 text-white w-64">
  <div className="p-4 text-xl font-bold flex justify-center items-center">
    <img src={logo} alt="logo" width='50' />
    <h1 className="ml-2">SellStream</h1>
  </div>
  <ul className="py-4">
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaHome className="mr-2" />
      <Link to='/'>Dashboard</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaBox className="mr-2" />
      <Link to='/products'>Products</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaTags className="mr-2" />
      <Link to='/category'>Categories</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaTags className="mr-2" />
      <Link to='/uom'>UOM</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaTags className="mr-2" />
      <Link to='/purchase'>Purchase</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaChartBar className="mr-2" />
      <Link to='/sales'>Sales</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaClipboardList className="mr-2" />
      <Link to='/order'>Order</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaUsers className="mr-2" />
      <Link to='/employee'>Employee</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaUserFriends className="mr-2" />
      <Link to='/customer'>Customer</Link>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
      <FaFileAlt className="mr-2" />
      <Link to='/report'>Reports</Link>
    </li>
  </ul>
</div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-cyan-600 p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Welcome Mr. / Ms. User</h1>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-1">
            <Routes >
                {/* <Route path="/" element={<Profile />} /> */}
                <Route path="/" element={<DashboardRoute />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/category" element={<Categories />} />
                <Route path="/uom" element={<Uom />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/order" element={<OrderComponent />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/report" element={<Reports />} />
            </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
};

export default DashboardPage;
