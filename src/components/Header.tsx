import Link from "next/link";

export default function Header() {
  return (
    <header className="contaner bg-primary text-black ">
      <div className="container mx-auto flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-10 h-10 p-2 bg-accent rounded-full"
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
          <span className="text-2xl font-bold tracking-tight">
            Smart Wallet
          </span>
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="px-4 py-2 font-semibold bg-accent text-primary rounded-full hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
            <Link href="/dashboard">Dashboard</Link>
          </button>
        </div>
      </div>
    </header>
  );
}
