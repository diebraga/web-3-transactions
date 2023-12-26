import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Transactions", () => {
  const deployTransactionsFixture = async () => {
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    return { transactions };
  };
  describe("Deployment", () => {
    it("Should deploy correctly and have initial count 0", async function () {
      const { transactions } = await loadFixture(deployTransactionsFixture);
      expect(await transactions.getTransactionsCount()).to.equal(0);
    });
  });
});
