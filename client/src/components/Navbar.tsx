import { FC } from "react";
import Logo from "../../images/logo.png";
// import { HiMenuAlt4 } from "react-icons/hi";
// import { AiOutlineClose } from "react-icons/ai";
import { NavbarItems } from "./NavbarItems";

export const Navbar: FC = () => {
  const navItems = ["Market", "Exchange", "Tutorials", "Wallets"];
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex items-center justify-center">
        <img src={Logo} alt="Logo" className="w-32 cursor-pointer" />
        <ul className="text-gray-800 md:flex list-none flex-row justify-between items-center flex-initial">
          {navItems.map((item) => (
            <NavbarItems key={item} title={item} />
          ))}
          <li className="py-2 px-7 mx-4 bg-blue-300 hover:bg-blue-400 rounded-full cursor-pointer transition duration-300">
            Login
          </li>
        </ul>
      </div>
    </nav>
  );
};
