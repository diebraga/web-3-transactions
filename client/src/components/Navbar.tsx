import { FC, useState } from "react";
import Logo from "../../images/logo.png";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Button, NavbarItems } from ".";

export const Navbar: FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navItems = ["Market", "Exchange", "Tutorials", "Wallets"];
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={Logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="font-semibold md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navItems.map((item) => (
          <NavbarItems key={item} title={item} />
        ))}
        <Button className="py-2 px-7 mx-4">Login</Button>
      </ul>
      <div className="flex relative">
        {!isOpenMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-gray-800 md:hidden cursor-pointer"
            onClick={() => setIsOpenMenu(true)}
          />
        )}
        {isOpenMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-gray-800 md:hidden cursor-pointer"
            onClick={() => setIsOpenMenu(false)}
          />
        )}
        {isOpenMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-gray-800 animate-slide-in"
          >
            <li className="text-xl w-full my-2 cursor-pointer">
              <AiOutlineClose onClick={() => setIsOpenMenu(false)} />
            </li>
            {navItems.map((item) => (
              <NavbarItems key={item} title={item} className="my-2 text-lg" />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};
