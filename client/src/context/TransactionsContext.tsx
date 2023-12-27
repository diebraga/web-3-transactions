import { createContext, ReactNode, useEffect, useState } from "react";
import { ethers, Eip1193Provider } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextProps {
  connectWalletToMetaMask: () => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [currAccount, setCurrAccount] = useState();
  const createEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    return transactionsContract;
  };

  const checkWalletConnection = async () => {
    if (!window.ethereum) alert("Please download metamask!");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts) {
      setCurrAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  const connectWalletToMetaMask = async () => {
    try {
      if (!window.ethereum) alert("Please download metamask!");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrAccount(accounts[0]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        alert(error.message);
      } else {
        console.log("An unexpected error occurred");
        alert("An unexpected error occurred");
      }
      throw new Error("No eth object");
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <TransactionsContext.Provider value={{ connectWalletToMetaMask }}>
      {children}
    </TransactionsContext.Provider>
  );
}
