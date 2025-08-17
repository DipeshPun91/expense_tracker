import React from "react";

const Hero = () => {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
        Take Control of Your <span className="text-indigo-600">Finances</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
        ExpenseTrack helps you monitor spending, create budgets, and achieve
        your financial goals with ease.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition duration-300 text-lg">
          Start Free Trial
        </button>
        <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-md hover:bg-indigo-50 transition duration-300 text-lg">
          See Demo
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-2 max-w-4xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Dashboard preview"
          className="rounded-lg w-full h-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
