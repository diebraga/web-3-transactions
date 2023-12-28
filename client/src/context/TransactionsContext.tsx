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
}

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [currAccount, setCurrAccount] = useState("");
  const [formData, setformData] = useState(formDataState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const createEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    console.log({
      provider,
      signer,
      transactionsContract,
    });

    return transactionsContract;
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
    await createEthereumContract();
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
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
