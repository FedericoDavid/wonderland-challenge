import { useReadContract, useChainId } from "wagmi";
import { erc20Abi, zeroAddress, formatUnits } from "viem";
import { sepolia } from "viem/chains";

import { SEPOLIA_CONTRACTS, POLYGON_CONTRACTS } from "../_config/wagmi";

export function useTokenBalance(address: string | undefined) {
  const chainId = useChainId();
  const contracts =
    chainId === sepolia.id ? SEPOLIA_CONTRACTS : POLYGON_CONTRACTS;

  const { data: daiBalance, isLoading: isDaiLoading } = useReadContract({
    address: contracts.DAI.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address as typeof zeroAddress] : undefined,
    account: address as typeof zeroAddress,
  });

  const { data: usdcBalance, isLoading: isUsdcLoading } = useReadContract({
    address: contracts.USDC.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address as typeof zeroAddress] : undefined,
    account: address as typeof zeroAddress,
  });

  console.log("Current balances:", {
    chainId,
    daiBalance: daiBalance?.toString(),
    usdcBalance: usdcBalance?.toString(),
    isLoading: { dai: isDaiLoading, usdc: isUsdcLoading },
  });

  return {
    dai: {
      raw: daiBalance ?? BigInt(0), // Aseguramos que siempre devolvemos un BigInt
      formatted: daiBalance
        ? formatUnits(daiBalance, contracts.DAI.decimals)
        : "0",
      loading: isDaiLoading,
    },
    usdc: {
      raw: usdcBalance ?? BigInt(0), // Aseguramos que siempre devolvemos un BigInt
      formatted: usdcBalance
        ? formatUnits(usdcBalance, contracts.USDC.decimals)
        : "0",
      loading: isUsdcLoading,
    },
    chainId,
  };
}
