import { useState , useEffect} from 'react';
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
import ShopProfile from './ShopProfile';
import { useLogoutMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../features/auth/authSlice';
import Leave from './leave';

const ShopDashboardPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get data from local storage
    const data = localStorage.getItem('user_info');
    if (data){
      setUserdata(JSON.parse(data));
    }
  },[]);


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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white  md:static md:w-64  text-sm md:text-md ${isDrawerOpen ? 'w-64' : 'w-0'} transition-width duration-300 overflow-hidden`}>
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
            <Link to='/shop-dashboard/main'>Dashboard</Link>
          </li>

          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                  <FaSitemap className="mr-2" />
                  <Link to='/shop-dashboard/shop'>Shop</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                  <FaSitemap className="mr-2" />
                  <Link to='/shop-dashboard/branches'>Branches</Link>
          </li>
          <li className="group relative px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaBox className="mr-2" />
            <Link to=''>Product</Link>
            <FaChevronRight className='ml-auto transform transition durations-300 group-hover:rotate-90' />
           <ul className='absolute right-0 top-0  mt-0 list-none text-white rounded shadow-lg bg-gray-800 opacity-0  group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300'> 
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FaBox className="mr-2" />
                    <Link to='/shop-dashboard/products'>Products</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FaTags className="mr-2" />
                    <Link to='/shop-dashboard/category'>Categories</Link>
                </li>
           </ul>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaChartBar className="mr-2" />
            <Link to='/shop-dashboard/sales'>Sales</Link>
          </li>
          
          
          

          <li className="group relative px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaShoppingBag className="mr-2" />
            <Link to=''>Order</Link>
            <FaChevronRight className='ml-auto transform transition duration-300 group-hover:rotate-90'/>
            <ul className='absolute right-0 top-0 mt-0 mb-2 text-white rounded shadow-lg bg-gray-800 opacity-0  group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300'>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                  <FaShoppingBag className="mb-2" />
                  <Link to='/shop-dashboard/purchase'>Purchase</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                  <FaClipboardList className="mb-2" />
                  <Link to='/shop-dashboard/order'>Orders List</Link>
                </li>
            </ul>
          </li>
          
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
            <FaUserFriends className="mr-2" />
            <Link to='/shop-dashboard/customer'>Customer</Link>
          </li>
          

          <li className="group relative px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
              <FaUsers className="mr-2" />
              <Link to='' className="flex-grow">Employee</Link>
              <FaChevronRight className="ml-auto transform transition duration-300 group-hover:rotate-180" />  
              <ul className="absolute right-0 top-0 mt-0 mr-2 bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-300">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FaUsers className="mr-2" />
                    <Link to='/shop-dashboard/employee'>Employee</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FaBriefcase className="mr-2" />
                    <Link to='/shop-dashboard/designation'>Designation</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FaCalendarCheck className="mr-2" />
                    <Link to='/shop-dashboard/attendance'>Attendance</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                    <FaPlaneDeparture className="mr-2" />
                    <Link to='/shop-dashboard/leave'>Leave</Link>
                </li>
              </ul>
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
            <h1 className="text-lg font-semibold hidden md:block ">Welcome {userdata ? userdata.username : 'User'}</h1>
            <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-[125px] mr-[15px] w-48 bg-white border rounded shadow-lg py-1 z-50">
                <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
                  <FaUser className="mr-2" />
                  <Link to='/shop-dashboard/profile'>User Profile</Link>
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
            <Route path="profile" element={<ShopProfile />} />
            <Route path="designation" element={<Designation />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<Leave />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
