// src/components/Navbar.jsx
// import { Menu } from '@headlessui/react';
// import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">SaaS Product</div>
        <div className="hidden md:flex space-x-4 text-white">
          <a href="#banner">Home</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#subscribe">Subscribe</a>
          <a href="#review">Review</a>
          <a href="#footer">Contact</a>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-4 mt-4 text-white">
            <a href="#banner" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
            <a href="#subscribe" onClick={() => setIsOpen(false)}>Subscribe</a>
            <a href="#review" onClick={() => setIsOpen(false)}>Review</a>
            <a href="#footer" onClick={() => setIsOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};



export default Navbar;
