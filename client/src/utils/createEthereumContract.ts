import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./constants";

export const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return transactionsContract;
};
