"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useTokenBalance } from "../_hooks/useTokenBalance";
import { Spinner } from "../_components/common/Spinner";
import { TokenOperations } from "../_components/web3/TokenOperations";

interface TokenTransferProps {
  onNeedTokens: () => void;
}

export function TokenTransfer({ onNeedTokens }: TokenTransferProps) {
  const [hasCheckedBalances, setHasCheckedBalances] = useState(false);
  const { address } = useAccount();
  const { dai, usdc, chainId } = useTokenBalance(address);

  useEffect(() => {
    if (address && !dai.loading && !usdc.loading && !hasCheckedBalances) {
      const daiAmount = BigInt(dai.raw?.toString() || "0");
      const usdcAmount = BigInt(usdc.raw?.toString() || "0");

      const needsTokens = daiAmount === BigInt(0) && usdcAmount === BigInt(0);

      if (needsTokens) {
        onNeedTokens();
      }

      setHasCheckedBalances(true);
    }
  }, [address, dai.loading, usdc.loading, hasCheckedBalances, onNeedTokens]);

  useEffect(() => {
    setHasCheckedBalances(false);
  }, [chainId]);

  if (!hasCheckedBalances) {
    return (
      <div className="flex items-center justify-center p-12">
        <Spinner />
      </div>
    );
  }

  return <TokenOperations />;
}
