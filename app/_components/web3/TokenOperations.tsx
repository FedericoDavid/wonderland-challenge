"use client";
import { useState } from "react";
import { useAccount } from "wagmi";

import { TokenAmountInput } from "./TokenAmountInput";
import { TokenActions } from "./TokenActions";
import { AddressInput } from "./AdressInput";

import { SEPOLIA_CONTRACTS } from "../../_config/wagmi";
import { useTokenBalance } from "../../_hooks/useTokenBalance";

export function TokenOperations() {
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [daiAmount, setDaiAmount] = useState<string>("");
  const [usdcAmount, setUsdcAmount] = useState<string>("");

  const { address } = useAccount();
  const { dai, usdc } = useTokenBalance(address);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Token Operations</h2>
      <div className="space-y-4">
        <AddressInput onAddressChange={setRecipientAddress} />
        <div className="space-y-4">
          <TokenAmountInput
            symbol={SEPOLIA_CONTRACTS.DAI.symbol}
            balance={dai.formatted}
            decimals={SEPOLIA_CONTRACTS.DAI.decimals}
            onAmountChange={setDaiAmount}
            currentAmount={daiAmount}
            disabled={!recipientAddress}
          />
          <TokenActions
            tokenAddress={SEPOLIA_CONTRACTS.DAI.address}
            tokenSymbol={SEPOLIA_CONTRACTS.DAI.symbol}
            decimals={SEPOLIA_CONTRACTS.DAI.decimals}
            amount={daiAmount}
            balance={dai.formatted}
            recipientAddress={recipientAddress}
            disabled={!recipientAddress || !daiAmount}
          />

          <TokenAmountInput
            symbol={SEPOLIA_CONTRACTS.USDC.symbol}
            balance={usdc.formatted}
            decimals={SEPOLIA_CONTRACTS.USDC.decimals}
            onAmountChange={setUsdcAmount}
            currentAmount={usdcAmount}
            disabled={!recipientAddress}
          />
          <TokenActions
            tokenAddress={SEPOLIA_CONTRACTS.USDC.address}
            tokenSymbol={SEPOLIA_CONTRACTS.USDC.symbol}
            decimals={SEPOLIA_CONTRACTS.USDC.decimals}
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
