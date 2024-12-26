import { defaultWagmiConfig } from "@web3modal/wagmi";
import { sepolia, polygonAmoy } from "viem/chains";

if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_WC_PROJECT_ID is required");
}

export const SEPOLIA_CONTRACTS = {
  DAI: {
    address: "0x1D70D57ccD2798323232B2dD027B3aBcA5C00091" as const,
    decimals: 18,
    symbol: "DAI",
  },
  USDC: {
    address: "0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47" as const,
    decimals: 6,
    symbol: "USDC",
  },
} as const;

export const config = defaultWagmiConfig({
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  chains: [sepolia, polygonAmoy],
  metadata: {
    name: "Web3 Challenge",
    description: "Web3 Challenge with Token Integration",
    url: "https://web3-challenge.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
});
