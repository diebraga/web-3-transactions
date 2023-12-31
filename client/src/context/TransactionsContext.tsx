import { createContext, ReactNode, useEffect, useState } from "react";
import { ethers, Eip1193Provider } from "ethers";
import { formDataState } from "../utils/constants";
import { handleNoEthObjError } from "../utils/handleNoEthObjError";
import { createEthereumContract } from "../utils/createEthereumContract";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TransactionsCardProps } from "../components/TransactionsCard";

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
  toggleAlertNetwork: () => void;
  currAccount: string;
  formData: typeof formDataState;
  isLoading: boolean;
  currNetwork: string;
  isAlertNetworkShowing: boolean;
  txs: TransactionsCardProps[];
  isMetamaskInstalled: boolean;
  toggleMetamaskAlert: () => void;
}

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [currAccount, setCurrAccount] = useState("");
  const [currNetwork, setCurrNetwork] = useState("");

  const [isAlertNetworkShowing, setIsAlertNetworkShowing] = useLocalStorage(
    "block:chain:diebraga:app",
    true
  );

  const [formData, setformData] = useState(formDataState);
  const [isLoading, setIsLoading] = useState(false);
  const [txs, setTxs] = useState([]);

  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);

  const toggleAlertNetwork = () => {
    setIsAlertNetworkShowing(!isAlertNetworkShowing);
  };

  const toggleMetamaskAlert = () => {
    setIsMetamaskInstalled(!isMetamaskInstalled);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTrasactions = async () => {
    if (!window.ethereum) {
      setIsMetamaskInstalled(false);
      return;
    }

    try {
      const { transactionsContract } = await createEthereumContract();

      const transactions = await transactionsContract.getAllTransactions();

      const formatTransactions = transactions.map((transaction: never) => {
        return {
          message: transaction[3],
          timestamp: new Date(parseInt(transaction[4])).toLocaleString(),
          addressFrom: transaction[0],
          amount: ethers.formatEther(transaction[2]),
          addressTo: transaction[1],
          keyword: transaction[5],
        };
      });

      setTxs(formatTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        setIsMetamaskInstalled(false);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const { provider } = await createEthereumContract();
      const network = await provider.getNetwork();

      setCurrNetwork(network.name);
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
      if (!window.ethereum) {
        setIsMetamaskInstalled(false);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrAccount(accounts[0]);
    } catch (error: unknown) {
      handleNoEthObjError(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) {
        setIsMetamaskInstalled(false);
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
    getAllTrasactions();
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
        currNetwork,
        toggleAlertNetwork,
        isAlertNetworkShowing,
        txs,
        isMetamaskInstalled,
        toggleMetamaskAlert,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
