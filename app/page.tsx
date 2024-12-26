"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { Layout } from "./_components/Layout";
import { TokensModal } from "./_components/web3/MintTokensModal";
import { TokenOperations } from "./_components/web3/TokenOperations";

import { useTokenBalance } from "./_hooks/useTokenBalance";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenedFrom, setModalOpenedFrom] = useState<"auto" | "button">(
    "auto"
  );

  const { isConnected, address } = useAccount();
  const { dai, usdc } = useTokenBalance(address);

  useEffect(() => {
    if (isConnected && address) {
      const needsTokens =
        !dai.raw ||
        !usdc.raw ||
        (dai.raw === BigInt(0) && usdc.raw === BigInt(0));

      if (needsTokens) {
        setModalOpenedFrom("auto");
        setIsModalOpen(true);
      }
    }
  }, [isConnected, address, dai.raw, usdc.raw]);

  const handleOpenModal = () => {
    setModalOpenedFrom("button");
    setIsModalOpen(true);
  };

  return (
    <Layout onOpenTokenModal={handleOpenModal}>
      {isConnected && (
        <div className="space-y-6">
          <TokenOperations />
          <TokensModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            openedFrom={modalOpenedFrom}
          />
        </div>
      )}
    </Layout>
  );
}
