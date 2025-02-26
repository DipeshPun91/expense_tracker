"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", src: "/svg/Home.svg", alt: "Home", label: "Home" },
  {
    href: "/dashboard",
    src: "/svg/Dashboard.svg",
    alt: "Dashboard",
    label: "Dashboard",
  },
  {
    href: "/budget",
    src: "/svg/Budget.svg",
    alt: "Budget",
    label: "Budget",
  },
  {
    href: "/expense",
    src: "/svg/Expense.svg",
    alt: "Expense",
    label: "Expense",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen p-6 fixed top-0 w-64 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 shadow-lg"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 mb-10 p-3 rounded-lg cursor-pointer"
      >
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <svg
            fill="white"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M355.003,0H85.333v182.857H48.762V512h256v-36.571h158.476V108.236L355.003,0z M365.714,62.431l35.093,35.093h-35.093 V62.431z M268.19,475.429H85.333v-256H268.19V475.429z M426.667,438.857H304.762v-256H121.905V36.571h207.238v97.524h97.524 V438.857z"></path>
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="121.905"
                    y="256"
                    width="109.714"
                    height="36.571"
                  ></rect>
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="121.905"
                    y="329.143"
                    width="36.571"
                    height="36.571"
                  ></rect>
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="195.048"
                    y="329.143"
                    width="36.571"
                    height="36.571"
                  ></rect>
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="121.905"
                    y="402.286"
                    width="36.571"
                    height="36.571"
                  ></rect>
                </g>
              </g>
              <g>
                <g>
                  <rect
                    x="195.048"
                    y="402.286"
                    width="36.571"
                    height="36.571"
                  ></rect>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SMART WALLET
        </span>
      </motion.div>

      <ul className="space-y-2">
        {links.map((link, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={link.href}
              className={`flex items-center gap-4 p-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-300 ${
                pathname === link.href
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold shadow-sm"
                  : ""
              }`}
            >
              <div
                className={`p-2 rounded-md ${
                  pathname === link.href
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-gray-100"
                }`}
              >
                <Image
                  src={link.src}
                  alt={link.alt}
                  width={20}
                  height={20}
                  className={`w-5 h-5 ${
                    pathname === link.href ? "filter brightness-0 invert" : ""
                  }`}
                />
              </div>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <div className="absolute bottom-6 left-6 right-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="text-sm font-semibold">Upgrade to Pro</span>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
