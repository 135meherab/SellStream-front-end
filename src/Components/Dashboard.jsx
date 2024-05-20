import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllProducts from './Products';
import OrderComponent from './Order';
import { FaHome, FaBox, FaTags, FaChartBar, FaClipboardList, FaSignOutAlt, FaUser, FaUsers, FaShoppingBag, FaUserFriends, FaFileAlt, FaStore, FaSitemap, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';
import DashboardRoute from './DashboradRoute';
import Employee from './Employee';
import Categories from './Categories';
import Reports from './Reports';
import Sales from './Sales';
import Purchase from './Purchase';
import Shop from './Shop';
import Branches from './Branches';
import Customer from './Customer';
import Users from './Users';
import userAvatar from '../assets/avater.png'
const DashboardPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
  };

  return (
      
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`bg-gray-800 text-white fixed md:static md:w-64 h-full text-sm md:text-md ${isDrawerOpen ? 'w-64' : 'w-0'} transition-width duration-300 overflow-hidden`}>
          <div className="p-4 text-xl font-bold flex justify-between items-center">
            <div className="flex items-center text-white">
              <img src={logo} alt="logo" width='50' className='bg-white w-12 h-12 rounded-full p-1 ' />
              <h1 className="ml-2">SellStream</h1>
            </div>
            <button className="md:hidden text-white" onClick={toggleDrawer}>
              <FaTimes />
            </button>
          </div>
          <ul className="py-4">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaHome className="mr-2" />
              <Link to='/dashboard/main'>Dashboard</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaBox className="mr-2" />
              <Link to='/dashboard/products'>Products</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaStore className="mr-2" />
              <Link to='/dashboard/shop'>Shop</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaSitemap className="mr-2" />
              <Link to='/dashboard/branches'>Branches</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaTags className="mr-2" />
              <Link to='/dashboard/category'>Categories</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaShoppingBag className="mr-2" />
              <Link to='/dashboard/purchase'>Purchase</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaChartBar className="mr-2" />
              <Link to='/dashboard/sales'>Sales</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaClipboardList className="mr-2" />
              <Link to='/dashboard/order'>Order</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaUserFriends className="mr-2" />
              <Link to='/dashboard/customer'>Customer</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaUserFriends className="mr-2" />
              <Link to='/dashboard/user'>Users</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaUsers className="mr-2" />
              <Link to='/dashboard/employee'>Employee</Link>
            </li>
            
            
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaFileAlt className="mr-2" />
              <Link to='/dashboard/report'>Reports</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
         
          <div className="bg-primary p-4 flex justify-between items-center flex-wrap">
            <button className="md:hidden text-white" onClick={toggleDrawer}>
              ☰
            </button>
          
            <h1 className="text-lg font-semibold "> Dashboard</h1>
            <div className="relative flex justify-center items-center" onClick={toggleDropdown}>
            <h1 className="text-lg font-semibold hidden md:block ">Welcome Mr. / Ms. User</h1>
              <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={toggleDropdown} />
              {isDropdownOpen && (
                 <div className="absolute right-0 mt-[125px] w-48 bg-white border rounded shadow-lg py-1 z-50">
                 <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
                   <FaUser className="mr-2" /> User Profile
                 </Link>
                 <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
                   <FaSignOutAlt className="mr-2" /> Logout
                 </button>
               </div>          

              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 flex-1">
            <Routes>
              <Route path="main" element={<DashboardRoute />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="shop" element={<Shop />} />
              <Route path="branches" element={<Branches />} />
              <Route path="category" element={<Categories />} />
              <Route path="purchase" element={<Purchase />} />
              <Route path="sales" element={<Sales />} />
              <Route path="order" element={<OrderComponent />} />
              <Route path="employee" element={<Employee />} />
              <Route path="customer" element={<Customer />} />
              <Route path="user" element={<Users />} />
              <Route path="report" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;
