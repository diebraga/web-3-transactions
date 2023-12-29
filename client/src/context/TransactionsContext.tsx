import { createContext, ReactNode, useEffect, useState } from "react";
import { ethers, Eip1193Provider } from "ethers";
import { formDataState } from "../utils/constants";
import { handleNoEthObjError } from "../utils/handleNoEthObjError";
import {
  MetamaskMethodType,
  requestAccountsMetamask,
} from "../utils/requestAccountsMetamask";
import { createEthereumContract } from "../utils/createEthereumContract";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextProps {
  connectWalletToMetaMask: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  sendTransaction: () => Promise<void>;
  setformData: React.Dispatch<React.SetStateAction<typeof formDataState>>;
  currAccount: string;
  formData: typeof formDataState;
  isLoading: boolean;
}

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [currAccount, setCurrAccount] = useState("");
  const [formData, setformData] = useState(formDataState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkWalletConnection = async () => {
    try {
      const { accounts } = await requestAccountsMetamask(
        MetamaskMethodType.EthAccounts
      );

      if (accounts) {
        setCurrAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      handleNoEthObjError(error);
    }
  };

  const connectWalletToMetaMask = async () => {
    try {
      const { accounts } = await requestAccountsMetamask(
        MetamaskMethodType.EthRequestAccounts
      );

      setCurrAccount(accounts[0]);
    } catch (error: unknown) {
      handleNoEthObjError(error);
    }
  };

  const sendTransaction = async () => {
    console.log("trans called");

    if (!window.ethereum) {
      alert("Please download MetaMask!");
      return;
    }
    const { addressTo, amount, keyword, message } = formData;
    const value = ethers.parseEther(amount);

    const transactionsContract = await createEthereumContract();

    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currAccount,
            to: addressTo,
            gas: "0x5208", // 21000 gwei
            value,
          },
        ],
      });

      const transactionHash = await transactionsContract.addToBlockChain(
        addressTo,
        value,
        message,
        Date.now(),
        keyword
      );
      setIsLoading(true);
      console.log(`Loading transaction ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Loading success ${transactionHash.hash}`);

      console.log(
        `Transaction conunt: ${await transactionsContract.getTransactionsCount()}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        connectWalletToMetaMask,
        currAccount,
        handleChange,
        formData,
        setformData,
        sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
