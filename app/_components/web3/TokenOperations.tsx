"use client";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { sepolia } from "viem/chains";

import { TokenAmountInput } from "./TokenAmountInput";
import { TokenActions } from "./TokenActions";
import { AddressInput } from "./AdressInput";

import { POLYGON_CONTRACTS, SEPOLIA_CONTRACTS } from "../../_config/wagmi";
import { useTokenBalance } from "../../_hooks/useTokenBalance";

export function TokenOperations() {
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [daiAmount, setDaiAmount] = useState<string>("");
  const [usdcAmount, setUsdcAmount] = useState<string>("");

  const { address } = useAccount();
  const { dai, usdc } = useTokenBalance(address);
  const chainId = useChainId();

  const contracts =
    chainId === sepolia.id ? SEPOLIA_CONTRACTS : POLYGON_CONTRACTS;

  return (
    <div className="bg-[#1a1b2e]/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-6 text-white">Token Operations</h2>
      <div className="space-y-6">
        <AddressInput onAddressChange={setRecipientAddress} />
        <div className="space-y-4">
          <TokenAmountInput
            symbol={contracts.DAI.symbol}
            balance={dai.formatted}
            decimals={contracts.DAI.decimals}
            onAmountChange={setDaiAmount}
            currentAmount={daiAmount}
            disabled={!recipientAddress}
          />
          <TokenActions
            tokenAddress={contracts.DAI.address}
            tokenSymbol={contracts.DAI.symbol}
            decimals={contracts.DAI.decimals}
            amount={daiAmount}
            balance={dai.formatted}
            recipientAddress={recipientAddress}
            disabled={!recipientAddress || !daiAmount}
          />

          <TokenAmountInput
            symbol={contracts.USDC.symbol}
            balance={usdc.formatted}
            decimals={contracts.USDC.decimals}
            onAmountChange={setUsdcAmount}
            currentAmount={usdcAmount}
            disabled={!recipientAddress}
          />
          <TokenActions
            tokenAddress={contracts.USDC.address}
            tokenSymbol={contracts.USDC.symbol}
            decimals={contracts.USDC.decimals}
            amount={usdcAmount}
            balance={usdc.formatted}
            recipientAddress={recipientAddress}
            disabled={!recipientAddress || !usdcAmount}
          />
        </div>
      </div>
    </div>
  );
}
