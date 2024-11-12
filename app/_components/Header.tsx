import Link from "next/link";
import { TbZoom } from "react-icons/tb";
import { GiHouse } from "react-icons/gi";
import { BsCart3 } from "react-icons/bs";
import ProfileDropdown from "./ProfileDropdown"; // Import the ProfileDropdown component

const Header: React.FC = () => {
  return (
    <header className="fixed bottom-0 w-full bg-[#e7c9ac] text-black z-[999] md:sticky md:top-0">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 ">
        {/* Logo and Title */}
        <Link href="/" className="text-2xl font-bold hidden md:flex items-center">
          <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG content */}
          </svg>
          Nordic Exp
        </Link>

        {/* Main Navigation */}
        <nav className="flex space-x-6 ml-4">
          <Link href="/all-packages" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 hover:text-[#88342c] transition duration-200">
            <TbZoom size={24} />
            <span>Packages</span>
          </Link>
          <Link href="/all-houses" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 hover:text-[#88342c] transition duration-200">
            <GiHouse size={24} />
            <span>Houses</span>
          </Link>
          {/* <Link href="/cart" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 hover:text-[#FFF2E5] transition duration-200">
            <BsCart3 size={24} />
            <span>Cart</span>
          </Link> */}
          <ProfileDropdown /> {/* Add the ProfileDropdown component */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
