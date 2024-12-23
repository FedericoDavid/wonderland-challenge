"use client";

import { useAccount } from "wagmi";
import { useTokenBalance } from "../../_hooks/useTokenBalance";

export function TokenBalances() {
  const { address } = useAccount();
  const { dai, usdc } = useTokenBalance(address);

  if (!address) return null;

  return (
    <div className="grid gap-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">Your Balances</h2>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="font-medium">DAI</span>
          {dai.loading ? (
            <span className="text-gray-500">Loading...</span>
          ) : (
            <span className="font-mono">{dai.formatted}</span>
          )}
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="font-medium">USDC</span>
          {usdc.loading ? (
            <span className="text-gray-500">Loading...</span>
          ) : (
            <span className="font-mono">{usdc.formatted}</span>
          )}
        </div>
      </div>
    </div>
  );
}
