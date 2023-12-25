import { FC, ButtonHTMLAttributes } from "react";

type ReusableButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const Button: FC<ReusableButtonType> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`bg-purple-500 rounded-full text-white cursor-pointer hover:bg-purple-600 ${className}`}
    >
      {children}
    </button>
  );
};
