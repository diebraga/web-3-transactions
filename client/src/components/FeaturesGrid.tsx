import { FC } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { FaEthereum } from "react-icons/fa";
import { SiWebtrees } from "react-icons/si";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { GiChaingun } from "react-icons/gi";

export const FeaturesGrid: FC = () => {
  const companyCommonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex items-center text-sm font-light text-gray-800";

  return (
    <div>
      <div className="flex">
        <div className={`rounded-tl-2xl gap-1 ${companyCommonStyles}`}>
          Reliability{" "}
          <AiFillSafetyCertificate
            className="text-gray-600"
            size={18}
            title="Reliability"
          />
        </div>
        <div className={`gap-1 ${companyCommonStyles}`}>
          Security{" "}
          <GrSecure className="text-gray-600" size={18} title="Securety" />
        </div>
        <div className={`sm:rounded-tr-2xl gap-1 ${companyCommonStyles}`}>
          Ethereum{" "}
          <FaEthereum className="text-gray-600" size={18} title="Eth" />
        </div>
      </div>
      <div className="flex">
        <div className={`sm:rounded-bl-2xl gap-1 ${companyCommonStyles}`}>
          Web 3.0{" "}
          <SiWebtrees className="text-gray-600" size={18} title="web-3" />
        </div>
        <div className={`gap-1 ${companyCommonStyles}`}>
          Low Fees{" "}
          <HiOutlineCurrencyDollar
            className="text-gray-600"
            size={18}
            title="fees"
          />
        </div>
        <div className={`rounded-br-2xl gap-1 ${companyCommonStyles}`}>
          Blockchain{" "}
          <GiChaingun className="text-gray-600" size={18} title="bloockchain" />
        </div>
      </div>
    </div>
  );
};
