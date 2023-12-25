import { FC } from "react";

export const FeaturesGrid: FC = () => {
  const companyCommonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-gray-800";

  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
      <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Reliability</div>
      <div className={companyCommonStyles}>Security</div>
      <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>Ethereum</div>
      <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Web 3.0</div>
      <div className={companyCommonStyles}>Low Fees</div>
      <div className={`rounded-br-2xl ${companyCommonStyles}`}>Blockchain</div>
    </div>
  );
};
