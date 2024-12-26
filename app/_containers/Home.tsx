"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { Layout } from "../_components/Layout";
import { TokenOperations } from "../_components/web3/TokenOperations";
import { TokensModal } from "../_components/web3/MintTokensModal";

import { useTokenBalance } from "../_hooks/useTokenBalance";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasCheckedBalances, setHasCheckedBalances] = useState<boolean>(false);
  const [modalOpenedFrom, setModalOpenedFrom] = useState<"auto" | "button">(
    "auto"
  );

  const { isConnected, address } = useAccount();
  const { dai, usdc, chainId } = useTokenBalance(address);

  useEffect(() => {
    if (
      isConnected &&
      address &&
      !dai.loading &&
      !usdc.loading &&
      !hasCheckedBalances
    ) {
      const daiAmount = BigInt(dai.raw?.toString() || "0");
      const usdcAmount = BigInt(usdc.raw?.toString() || "0");

      const needsTokens = daiAmount === BigInt(0) && usdcAmount === BigInt(0);

      if (needsTokens) {
        setIsModalOpen(true);
      }

      setHasCheckedBalances(true);
    }
  }, [isConnected, address, dai.loading, usdc.loading, hasCheckedBalances]);

  useEffect(() => {
    setHasCheckedBalances(false);
  }, [chainId]);

  const handleOpenModal = () => {
    setModalOpenedFrom("button");
    setIsModalOpen(true);
  };

  return (
    <Layout onOpenTokenModal={handleOpenModal}>
      {isConnected && (
        <div className="space-y-6">
          {!hasCheckedBalances ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <TokenOperations />
          )}

          <TokensModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            openedFrom={modalOpenedFrom}
          />
        </div>
      )}
    </Layout>
  );
};

export default Home;
