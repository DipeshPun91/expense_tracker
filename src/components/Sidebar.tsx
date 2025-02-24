"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <aside className="h-screen p-4 fixed top-0 w-64 border-r border-gray-800">
      <ul className="flex flex-col justify-start h-full">
        <li className="flex justify-between rounded-lg items-center mt-5 mb-10">
          <div className="flex items-center text-black gap-2">
            <svg
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
            >
              <path d="M112.31,268l40.36-68.69,34.65,59-67.54,115h135L289.31,432H16Zm58.57-99.76,33.27-56.67L392.44,432H325.76ZM222.67,80h66.59L496,432H429.32Z"></path>
            </svg>
            <span className="font-semibold text-xl mr-4">SMART WALLET</span>
          </div>
        </li>

        {links.map((link, index) => (
          <li className="mb-4 rounded-lg border border-gray-800" key={index}>
            <Link
              href={link.href}
              className={`flex items-center gap-6 text-black p-3 rounded-lg font-semibold hover:bg-accent hover:text-black border-2 transition ease-in-out ${
                pathname === link.href
                  ? "outline-none ring-2 ring-accent border-accent bg-accent"
                  : ""
              }`}
            >
              <Image src={link.src} alt={link.alt} height={20} width={20} />
              <span className="font-semibold">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
