import { ethers } from "hardhat";

async function main() {
  const Trasactions = await ethers.getContractFactory("Transactions");
  const transactions = await Trasactions.deploy();

  await transactions.waitForDeployment();

  console.log(`Trasactions contract deployed`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
