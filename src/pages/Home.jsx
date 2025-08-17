import React from "react";
import {
  FaChartLine,
  FaMobileAlt,
  FaShieldAlt,
  FaSyncAlt,
  FaPiggyBank,
} from "react-icons/fa";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import Hero from "../components/home/Hero";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <Hero />

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

      <Footer />
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
