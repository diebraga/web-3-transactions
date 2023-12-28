export enum MetamaskMethodType {
  EthAccounts = "eth_accounts",
  EthRequestAccounts = "eth_requestAccounts",
}
export const requestAccountsMetamask = async (method: MetamaskMethodType) => {
  if (!window.ethereum) {
    alert("Please download MetaMask!");
    return { accounts: [] };
  }

  const accounts = await window.ethereum.request({
    method,
  });
  return { accounts };
};
