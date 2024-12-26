"use client";

import { useState } from "react";
import { useWriteContract, useChainId, useAccount } from "wagmi";
import { parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { toast } from "react-toastify";

import { AddressInput } from "../_components/web3/AdressInput";
import { Button } from "../_components/common/Button";
import { TokenAmountInput } from "../_components/web3/TokenAmountInput";

import { POLYGON_CONTRACTS, SEPOLIA_CONTRACTS } from "../_config/wagmi";
import { getTokenAbi } from "../_utils/getTokenAbi";

export function MintExternal() {
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<"DAI" | "USDC">("DAI");

  const { address } = useAccount();
  const chainId = useChainId();

  const contracts =
    chainId === sepolia.id ? SEPOLIA_CONTRACTS : POLYGON_CONTRACTS;

  const { writeContract: mint, isPending } = useWriteContract({
    mutation: {
      onSuccess: (hash) => {
        toast.success(`Token minted successfully! Hash: ${hash}`);

        setAmount("");
        setRecipientAddress("");
      },
      onError: (error) => {
        toast.error(`Failed to mint token: ${error.message}`);
      },
    },
  });

  const handleMint = () => {
    if (!address || !recipientAddress || !amount) return;

    try {
      const token = {
        address: contracts[selectedToken].address,
        decimals: contracts[selectedToken].decimals,
        abi: getTokenAbi(chainId, selectedToken),
      };

      const parsedAmount = parseUnits(amount, token.decimals);

      toast.info(`Please confirm ${selectedToken} mint transaction...`);

      mint({
        address: token.address,
        abi: token.abi,
        functionName: "mint",
        args: [recipientAddress as `0x${string}`, parsedAmount] as const,
      });
    } catch (error) {
      console.error("Mint failed:", error);
    }
  };

  return (
    <div className="bg-[#1a1b2e]/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-2 text-white">Mint</h2>
      <p className="text-gray-400 mb-6">Mint to external wallet</p>

      <div className="space-y-6">
        <AddressInput onAddressChange={setRecipientAddress} />

        <div className="flex gap-4">
          <Button
            variant={selectedToken === "DAI" ? "primary" : "secondary"}
            onClick={() => setSelectedToken("DAI")}
          >
            DAI
          </Button>
          <Button
            variant={selectedToken === "USDC" ? "primary" : "secondary"}
            onClick={() => setSelectedToken("USDC")}
          >
            USDC
          </Button>
        </div>

        <TokenAmountInput
          symbol={selectedToken}
          balance="∞"
          decimals={selectedToken === "DAI" ? 18 : 6}
          onAmountChange={setAmount}
          currentAmount={amount}
          disabled={!recipientAddress}
        />

        <Button
          onClick={handleMint}
          disabled={!amount || !recipientAddress || isPending}
          isLoading={isPending}
          className="w-full"
        >
          {isPending ? "Minting..." : `Mint ${selectedToken}`}
        </Button>
      </div>
    </div>
  );
}
