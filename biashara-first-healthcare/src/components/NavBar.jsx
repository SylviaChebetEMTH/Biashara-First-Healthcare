import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import hospitallogo from "../components/icons/YuBuntu-Logo-WpT-p-500 (1).png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#020234] text-white">
      {/* Top Bar */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="text-gray-300">
              Connecting Businesses and Hospitals for Better Health Access
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="tel:+254790761708" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <FaPhone className="text-[#3dd8c8]" size={12} />
              <span className="text-xs md:text-sm">Call Us: +254 712 345 678</span>
            </a>
            <a href="mailto:hello@biasharafirsthealthcare.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <FaEnvelope className="text-[#3dd8c8]" size={12} />
              <span className="text-xs md:text-sm">Mail Us: hello@biasharafirsthealthcare.com</span>
            </a>
            <div className="flex items-center gap-3 ml-2">
              <a href="https://facebook.com" className="text-gray-300 hover:text-[#3dd8c8] transition-colors" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="https://x.com" className="text-gray-300 hover:text-[#3dd8c8] transition-colors" aria-label="Twitter">
                <FaTwitter size={14} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-[#3dd8c8] transition-colors" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-[#3dd8c8] transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 border-b border-gray-500">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={hospitallogo} 
              alt="Biashara First Healthcare Logo" 
              className="h-5 md:h-7 w-auto" 
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-white focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-[#3dd8c8] transition-colors font-medium"
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className="text-white hover:text-[#3dd8c8] transition-colors font-medium"
            >
              About Us
            </Link>

           
            <Link 
              to="/find-hospitals" 
              className="text-white hover:text-[#3dd8c8] transition-colors font-medium"
            >
              Find Hospitals
            </Link>
             <Link 
              to="/contact" 
              className="text-white hover:text-[#3dd8c8] transition-colors font-medium"
            >
              Contact Us
            </Link>


            <div className="flex items-center gap-3">
              <Link 
                to="/register-business" 
                className="bg-[#3dd8c8] hover:bg-[#2bc4b4] text-[#020234] px-5 py-2 rounded-md font-semibold transition-colors"
              >
                Register Business
              </Link>

              <Link 
                to="/register-hospital" 
                className="bg-white hover:bg-gray-100 text-[#020234] px-5 py-2 rounded-md font-semibold transition-colors"
              >
                Register Hospital
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-700 mt-2">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className="text-white hover:text-[#3dd8c8] py-2 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>

              <Link 
                to="/about" 
                className="text-white hover:text-[#3dd8c8] py-2 transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </Link>

              <Link 
                to="/how-it-works" 
                className="text-white hover:text-[#3dd8c8] py-2 transition-colors"
                onClick={toggleMenu}
              >
                How It Works
              </Link>

              <Link 
                to="/find-hospitals" 
                className="text-white hover:text-[#3dd8c8] py-2 transition-colors"
                onClick={toggleMenu}
              >
                Find Hospitals
              </Link>

              <Link 
                to="/partnerships" 
                className="text-white hover:text-[#3dd8c8] py-2 transition-colors"
                onClick={toggleMenu}
              >
                Partnerships
              </Link>

              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-700">
                <Link 
                  to="/register-business" 
                  className="bg-[#3dd8c8] hover:bg-[#2bc4b4] text-[#020234] px-5 py-3 rounded-md font-semibold text-center transition-colors"
                  onClick={toggleMenu}
                >
                  Register Business
                </Link>

                <Link 
                  to="/register-hospital" 
                  className="bg-white hover:bg-gray-100 text-[#020234] px-5 py-3 rounded-md font-semibold text-center transition-colors"
                  onClick={toggleMenu}
                >
                  Register Hospital
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;