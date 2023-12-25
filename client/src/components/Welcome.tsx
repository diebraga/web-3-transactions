import { CreditCard, FeaturesGrid, Loader } from ".";
import { FC } from "react";

export const Welcome: FC = () => {
  const handleSubmit = () => {};

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-gray-900 text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-gray-800 font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily.
          </p>
          <button
            type="button"
            // onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-purple-400 p-3 rounded-full cursor-pointer hover:bg-purple-500 w-full"
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>

          <FeaturesGrid />
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <CreditCard />

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            {/* <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
 */}
            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {/* {true ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-gray-800 w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
