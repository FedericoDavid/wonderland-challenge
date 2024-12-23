"use client";

import { useAccount } from "wagmi";

import { WalletConnect } from "./_components/web3/WalletConnect";
import { TokenBalances } from "./_components/web3/TokenBalances";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Wonderland</h1>
          <WalletConnect />
        </nav>
        {isConnected && (
          <div className="space-y-6">
            <TokenBalances />
          </div>
        )}
      </div>
    </div>
  );
}
