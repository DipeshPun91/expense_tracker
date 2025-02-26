import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm p-3"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.a
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 group"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
          >
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-8 h-8"
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
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            SmartWallet
          </span>
        </motion.a>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/dashboard"
            className="px-6 py-2 font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Dashboard
            <FiArrowUpRight className="text-lg" />
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
