import { FC } from "react";

type NavbarItemsProps = {
  title: string;
  className?: string;
};

export const NavbarItems: FC<NavbarItemsProps> = ({ title, className }) => {
  return <li className={`mx-4 cursor-pointer ${className}`}>{title}</li>;
};
