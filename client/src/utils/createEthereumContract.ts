import { ContractTransaction, Contract } from "ethers";
import { contractAbi, contractAddress } from "./constants";
import { BrowserProvider } from "ethers";
import { BigNumberish } from "ethers";

export interface TransactionsContract {
  addToBlockChain: (
    receiver: string,
    amount: BigNumberish,
    message: string,
    timestamp: BigNumberish,
    keyword: string
  ) => Promise<ContractTransaction>;
  getAllTransactions: () => Promise<
    Array<{
      from: string;
      receiver: string;
      amount: string;
      message: string;
      timestamp: string;
      keyword: string;
    }>
  >;
  getTransactionsCount: () => Promise<number>;
}

export const createEthereumContract = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const transactionsContract = new Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return { transactionsContract, provider, signer };
};
