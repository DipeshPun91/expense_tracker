"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import { FiPieChart, FiTarget, FiDollarSign } from "react-icons/fi";

export default function Home() {
  return (
    <>
      <Header />

      <section className="bg-gradient-to-br from-blue-50 to-purple-50 pt-20 pb-28">
        <div className="container mx-auto px-5 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Smart Financial Management
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your financial life with insights and effortless expense
              tracking.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Powerful Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiDollarSign className="w-12 h-12" />,
                title: "Expense Tracking",
                description:
                  "Automatically categorize and track every transaction in real-time",
              },
              {
                icon: <FiPieChart className="w-12 h-12" />,
                title: "Advanced Analytics",
                description:
                  "Visualize spending patterns with interactive dashboards",
              },
              {
                icon: <FiTarget className="w-12 h-12" />,
                title: "Goal Planning",
                description:
                  "Set and achieve financial goals with smart budgeting tools",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-5 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Join thousands of users who&apos;ve already taken control of their
              financial future
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-5 rounded-xl text-xl font-bold shadow-2xl hover:bg-opacity-90 transition-all"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
