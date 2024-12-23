"use client";

import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { SEPOLIA_CONTRACTS } from "../_config/wagmi";
import { formatUnits } from "viem";

export function useTokenBalance(address: string | undefined) {
  const { data: daiBalance, isLoading: isDaiLoading } = useReadContract({
    address: SEPOLIA_CONTRACTS.DAI.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const { data: usdcBalance, isLoading: isUsdcLoading } = useReadContract({
    address: SEPOLIA_CONTRACTS.USDC.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  return {
    dai: {
      raw: daiBalance,
      formatted: daiBalance
        ? formatUnits(daiBalance, SEPOLIA_CONTRACTS.DAI.decimals)
        : "0",
      loading: isDaiLoading,
    },
    usdc: {
      raw: usdcBalance,
      formatted: usdcBalance
        ? formatUnits(usdcBalance, SEPOLIA_CONTRACTS.USDC.decimals)
        : "0",
      loading: isUsdcLoading,
    },
  };
}
