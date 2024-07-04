import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'; // Import Link from React Router


 // Assuming your CSS is in Navbar.css

const Navbars = () => {
  return (
    <nav className="colour  p-4 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex left-side items-center">
        <a className="nav-logo h-8 w-12 mr-5" href=""><img src={logo} alt="Logo"  /></a>
        <a href="#" className="home text-white mr-6 ">Home</a>
        <a href="#price" className="pricing text-white mr-6 ">Pricing</a>
      </div>

      {/* Right Side */}
      <div className="flex right-side items-center">
        <a href="/login" className="login text-white  mr-4 ">Login</a>
        <a href="/sign_up" className="signup text-white mr-4 py-2  ">Sign Up</a>
      </div>
    </nav>

  );
};

export default Navbars;

