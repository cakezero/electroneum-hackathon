import { vars, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const ANKR_RPC = vars.get("ANKR_RPC")
const PRIVATE_KEY = vars.get("PRIVATE_KEY")

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    electroneum: {
      url: ANKR_RPC,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
