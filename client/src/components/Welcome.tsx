import { Button, CreditCard, FeaturesGrid, WelcomeForm } from ".";
import { FC, FormEvent } from "react";
import { useTransactions } from "../hooks/useTransaction";

export const Welcome: FC = () => {
  const {
    connectWalletToMetaMask,
    currAccount,
    formData,
    handleChange,
    setformData,
    sendTransaction,
  } = useTransactions();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) return;
    sendTransaction();
  };
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-gray-900 text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-gray-800 font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily.
          </p>
          {!currAccount && (
            <Button
              type="button"
              onClick={connectWalletToMetaMask}
              className="flex flex-row justify-center items-center my-5 p-3 rounded-full cursor-pointer w-full"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </Button>
          )}

          <FeaturesGrid />
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <CreditCard />
          <WelcomeForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
