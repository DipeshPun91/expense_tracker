"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", src: "/svg/Home.svg", alt: "Home" },
  {
    href: "/dashboard",
    src: "/svg/Dashboard.svg",
    alt: "Dashboard",
  },
  {
    href: "/budget",
    src: "/svg/Budget.svg",
    alt: "Budget",
  },
  {
    href: "/expense",
    src: "/svg/Expense.svg",
    alt: "Expense",
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 bottom-0 w-full transition-all ease-in-out">
      <ul className="flex justify-around w-full p-4 items-center rounded-lg bg-primary">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} passHref>
              <div
                className={`flex items-center gap-2 effect text-black p-3 rounded-full bg-transparent transition ease-in-out transform hover:translate-y-[-3px] cursor-pointer ${
                  pathname === link.href
                    ? "outline-none ring-2 ring-accent border-accent bg-accent"
                    : ""
                }`}
              >
                <Image src={link.src} alt={link.alt} height={20} width={20} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
