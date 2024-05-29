import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia.rpc.subquery.network/public",
      accounts: [`${process.env.PRIVATE_KEY}`],
    }
  }
};

export default config;
