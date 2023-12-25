import { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";

export const CreditCard: FC = () => {
  return (
    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 bg-gradient-to-br from-purple-400 via-red-400 to-green-300 white-glassmorphism">
      <div className="flex justify-between flex-col w-full h-full">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
            <SiEthereum fontSize={21} color="#fff" />
          </div>
          <BsInfoCircle fontSize={17} color="#fff" />
        </div>
        <div>
          <p className="text-white font-light text-sm">0x23466x000988hjkj</p>
          <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
        </div>
      </div>
    </div>
  );
};
