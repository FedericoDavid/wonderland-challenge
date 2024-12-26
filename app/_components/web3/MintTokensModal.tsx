"use client";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { useAccount, useWriteContract, useChainId } from "wagmi";
import { parseUnits } from "viem";
import { sepolia } from "viem/chains";

import { useTokenBalance } from "@/app/_hooks/useTokenBalance";
import { SEPOLIA_CONTRACTS, POLYGON_CONTRACTS } from "../../_config/wagmi";
import { daiAbi } from "@/app/_services/sepolia/dai/abi";
import { usdcAbi } from "@/app/_services/sepolia/usdc/abi";

interface TokensModalProps {
  isOpen: boolean;
  onClose: () => void;
  openedFrom: "auto" | "button";
}

export function TokensModal({ isOpen, onClose, openedFrom }: TokensModalProps) {
  const chainId = useChainId();
  const contracts =
    chainId === sepolia.id ? SEPOLIA_CONTRACTS : POLYGON_CONTRACTS;
  const { address } = useAccount();
  const { dai, usdc } = useTokenBalance(address);

  const { writeContract: mint, isPending } = useWriteContract({
    mutation: {
      onSuccess: (hash) => {
        toast.success(
          `Token minted succesfully. Your transaction hash's: ${hash}`
        );
        onClose();
      },
      onError: () => {
        toast.error("Ups! Something went wrong, please try again later");
      },
    },
  });

  const needsTokens =
    !dai.raw || !usdc.raw || (dai.raw === BigInt(0) && usdc.raw === BigInt(0));

  const handleMint = (
    tokenAddress: string,
    symbol: string,
    decimals: number,
    abi: typeof daiAbi | typeof usdcAbi
  ) => {
    if (!address) return;

    try {
      const amount = parseUnits("10", decimals);

      toast.info(`Please confirm ${symbol} mint transaction...`);

      mint({
        address: tokenAddress as `0x${string}`,
        abi,
        functionName: "mint",
        args: [address as `0x${string}`, amount] as const,
      });
    } catch (error) {
      toast.error(
        `Failed to mint ${symbol}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#0a0b1e]/80 border border-gray-500/30 p-6 text-left align-middle shadow-xl transition-all backdrop-blur-xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-white mb-4"
                >
                  {openedFrom === "auto" && needsTokens
                    ? "Welcome! Get Started with Some Tokens"
                    : "Get More Tokens"}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-gray-300">
                    {openedFrom === "auto" && needsTokens
                      ? "To use this app, you need DAI or USDC tokens. Would you like to mint some test tokens?"
                      : "Mint additional test tokens to continue experimenting."}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {(openedFrom === "button" ||
                    !dai.raw ||
                    dai.raw === BigInt(0)) && (
                    <button
                      onClick={() =>
                        handleMint(
                          contracts.DAI.address,
                          "DAI",
                          contracts.DAI.decimals,
                          daiAbi
                        )
                      }
                      disabled={isPending}
                      className="px-4 py-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 transition-all duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? "Minting..." : "Mint 10 DAI"}
                    </button>
                  )}

                  {(openedFrom === "button" ||
                    !usdc.raw ||
                    usdc.raw === BigInt(0)) && (
                    <button
                      onClick={() =>
                        handleMint(
                          contracts.USDC.address,
                          "USDC",
                          contracts.USDC.decimals,
                          usdcAbi
                        )
                      }
                      disabled={isPending}
                      className="px-4 py-3 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 transition-all duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? "Minting..." : "Mint 10 USDC"}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
