import React from "react";
import {
  FaChartLine,
  FaMobileAlt,
  FaShieldAlt,
  FaSyncAlt,
  FaPiggyBank,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">ExpenseTrack</div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-700 hover:text-indigo-600">
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-indigo-600"
          >
            How It Works
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-indigo-600">
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-gray-700 hover:text-indigo-600"
          >
            Testimonials
          </a>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
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

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<FaChartLine className="text-indigo-600" size={32} />}
              title="Expense Analytics"
              description="Visualize your spending patterns with beautiful charts and insights."
            />
            <FeatureCard
              icon={<FaMobileAlt className="text-indigo-600" size={32} />}
              title="Mobile Sync"
              description="Access your data anywhere with our iOS and Android apps."
            />
            <FeatureCard
              icon={<FaShieldAlt className="text-indigo-600" size={32} />}
              title="Bank-Level Security"
              description="Your data is encrypted and protected with enterprise-grade security."
            />
            <FeatureCard
              icon={<FaSyncAlt className="text-indigo-600" size={32} />}
              title="Auto Categorization"
              description="Transactions are automatically categorized for your convenience."
            />
            <FeatureCard
              icon={<FaPiggyBank className="text-indigo-600" size={32} />}
              title="Savings Goals"
              description="Set and track progress toward your financial objectives."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Connect Your Accounts"
              description="Securely link your bank accounts, credit cards, and other financial institutions."
            />
            <StepCard
              number="2"
              title="Track & Categorize"
              description="ExpenseTrack automatically categorizes your transactions."
            />
            <StepCard
              number="3"
              title="Analyze & Improve"
              description="Use our insights to identify spending patterns and save money."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have saved an average of 20% on their
            monthly expenses.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-md hover:bg-gray-100 transition duration-300 text-lg font-semibold">
            Get Started - It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ExpenseTrack</h3>
              <p className="text-gray-400">
                Helping you achieve financial freedom one transaction at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Apps
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} ExpenseTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
