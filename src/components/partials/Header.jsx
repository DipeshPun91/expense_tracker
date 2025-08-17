import React from "react";

const Header = () => {
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">ExpenseTrack</div>
      <div className="hidden md:flex space-x-8">
        <a href="#features" className="text-gray-700 hover:text-indigo-600">
          Features
        </a>
        <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600">
          How It Works
        </a>
        <a href="#pricing" className="text-gray-700 hover:text-indigo-600">
          Pricing
        </a>
        <a href="#testimonials" className="text-gray-700 hover:text-indigo-600">
          Testimonials
        </a>
      </div>
      <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
        Get Started
      </button>
    </nav>
  );
};

export default Header;
