import { vars, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const ANKR_RPC = vars.get("ANKR_RPC")
const PRIVATE_KEY = vars.get("PRIVATE_KEY")

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    electroneum: {
      url: "https://rpc.ankr.com/electroneum_testnet/fa11daf359979d274ae40321eabc6ae4691980bd7576b0ff21c4cba6ce3e4912",
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
