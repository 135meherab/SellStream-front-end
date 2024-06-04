import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'; // Import Link from React Router


 // Assuming your CSS is in Navbar.css

const Navbars = () => {
  return (
    <nav className="colour  p-4 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex left-side items-center">
        <img src={logo} alt="Logo" className="nav-logo h-8 w-8 mr-2" />
        <a href="#" className="text-black mr-4 ">Home</a>
        <a href="#" className="text-black mr-4 ">Pricing</a>
      </div>

      {/* Right Side */}
      <div className="flex right-side items-center">
        <a href="/login" className="text-black mr-4 ">Login</a>
        <a href="#" className="signup text-black px-4 py-2  ">Sign in</a>
      </div>
    </nav>

  );
};

export default Navbars;




// // src/components/Navbar.jsx
// // import { Menu } from '@headlessui/react';
// // import { MenuIcon, XIcon } from '@heroicons/react/outline';
// import React from 'react';


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-primary p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-2xl font-bold">SaaS Product</div>
//         <div className="hidden md:flex space-x-4 text-white">
//           <a href="#banner">Home</a>
//           <a href="#services">Services</a>
//           <a href="#pricing">Pricing</a>
//           <a href="#subscribe">Subscribe</a>
//           <a href="#review">Review</a>
//           <a href="#footer">Contact</a>
//         </div>
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-white focus:outline-none"
//           >
//             ☰
//           </button>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="flex flex-col items-center space-y-4 mt-4 text-white">
//             <a href="#banner" onClick={() => setIsOpen(false)}>Home</a>
//             <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
//             <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
//             <a href="#subscribe" onClick={() => setIsOpen(false)}>Subscribe</a>
//             <a href="#review" onClick={() => setIsOpen(false)}>Review</a>
//             <a href="#footer" onClick={() => setIsOpen(false)}>Contact</a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };



// export default Navbar;



