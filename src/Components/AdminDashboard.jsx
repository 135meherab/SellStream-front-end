import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AllProducts from './Products';
import OrderComponent from './Order';
import {
  FaChevronRight, FaBriefcase, FaCalendarCheck, FaHome, FaBox, FaTags, FaChartBar, FaClipboardList,
  FaSignOutAlt, FaUser, FaUsers, FaPlaneDeparture, FaShoppingBag, FaUserFriends, FaFileAlt, FaStore, FaSitemap, FaTimes
} from 'react-icons/fa';
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
import Designation from './Designation';
import Attendance from './Attendance';
import userAvatar from '../assets/avater.png';
import Profile from './Profile';
import { useLogoutMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../features/auth/authSlice';
import Leave from './leave';

const AdminDashboardPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    dispatch(userLoggedOut());
    localStorage.removeItem("user_info");
    localStorage.removeItem("auth");
    location.reload();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white fixed md:static md:w-64 h-full text-sm md:text-md ${isDrawerOpen ? 'w-64' : 'w-0'} transition-width duration-300 overflow-hidden`}>
        <div className="p-4 text-xl font-bold flex justify-between items-center">
          <div className="flex items-center text-white">
            <img src={logo} alt="logo" width='50' className='bg-gray-400 w-12 h-12 rounded-full p-1 ' />
            <h1 className="ml-2 text-primary">SellStream</h1>
          </div>
          <button className="md:hidden text-white" onClick={toggleDrawer}>
            <FaTimes />
          </button>
        </div>
        <ul className="py-5 space-y-2">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaHome className="mr-2" />
            <Link to='/admin-dashboard/main'>Dashboard</Link>
          </li>
          
          <li className=" group relative px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaStore className="mr-2" />
            <Link to=''>Shop</Link>
            <FaChevronRight className='ml-auto transform transition duration-300 group-hover:rotate-90'/>
            <ul className='absolute right-0 top-0 mt-0 mr-2 text-white rounded shadow-lg bg-gray-800 opacity-0  group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300'>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                  <FaStore className="mr-2" />
                  <Link to='/admin-dashboard/shop'>Shops</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                  <FaSitemap className="mr-2" />
                  <Link to='/admin-dashboard/branches'>Branches</Link>
                </li>
            </ul>
          
          </li>

          
          
          
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaUserFriends className="mr-2" />
            <Link to='/admin-dashboard/user'>Users</Link>
          </li>
        

          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaFileAlt className="mr-2" />
            <Link to='/admin-dashboard/report'>Reports</Link>
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

          <h1 className="text-lg font-semibold ">POS Dashboard</h1>
          <div className="relative flex justify-center items-center" onClick={toggleDropdown}>
            <h1 className="text-lg font-semibold hidden md:block ">Welcome Mr. / Ms. User</h1>
            <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-[125px] mr-[15px] w-48 bg-white border rounded shadow-lg py-1 z-50">
                <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
                  <FaUser className="mr-2" />
                  <Link to='/admin-dashboard/profile'>User Profile</Link>
                </Link>
                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
                  <FaSignOutAlt className="mr-2 text-red-600" /> <p className='text-red-600'>Logout</p>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-1">
          <Routes>
            <Route path="main" element={<DashboardRoute />} />
            <Route path="shop" element={<Shop />} />
            <Route path="branches" element={<Branches />} />
            <Route path="user" element={<Users />} />
            <Route path="profile" element={<Profile />} />
            <Route path="report" element={<Reports />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
