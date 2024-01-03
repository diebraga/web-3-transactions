import { createContext, ReactNode, useEffect, useState } from "react";
import { ethers, Eip1193Provider } from "ethers";
import {
  contractAbi,
  contractAddress,
  formDataState,
} from "../utils/constants";
import { handleNoEthObjError } from "../utils/handleNoEthObjError";
import {
  MetamaskMethodType,
  requestAccountsMetamask,
} from "../utils/requestAccountsMetamask";

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return { transactionsContract, provider, signer };
};

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

      const { provider } = await createEthereumContract();
      const network = await provider.getNetwork();
      console.log({ network: network.name });

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
    try {
      if (!window.ethereum) {
        alert("Please download MetaMask!");
        return;
      }

      const { addressTo, amount, keyword, message } = formData;
      const value = ethers.parseEther(amount);

      const { transactionsContract, signer } = await createEthereumContract();

      await signer.sendTransaction({
        to: addressTo,
        value,
      });
      const transactionHash = await transactionsContract.addToBlockChain(
        addressTo,
        value,
        message,
        Date.now(),
        keyword
      );
      setIsLoading(true);
      await transactionHash.wait();
      setIsLoading(false);
      const count = await transactionsContract.getTransactionsCount();
      console.log(`Transaction count: ${count}`);
      setformData(formDataState);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, [currAccount]);

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
