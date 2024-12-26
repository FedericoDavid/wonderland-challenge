"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Layout } from "../_components/Layout";
import { Tabs } from "../_components/common/Tabs";
import { Deposit } from "./Deposit";
import { TokenTransfer } from "./TokenTransfer";
import { MintExternal } from "./MintExternal";
import { TokensModal } from "../_components/web3/MintTokensModal";

const tabs = [
  { id: "deposit", label: "Deposit" },
  { id: "transfer", label: "Transfer" },
  { id: "mint", label: "Mint", isNew: true },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("transfer");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenedFrom, setModalOpenedFrom] = useState<"auto" | "button">(
    "auto"
  );
  const { isConnected } = useAccount();

  const handleOpenModal = () => {
    setModalOpenedFrom("button");
    setIsModalOpen(true);
  };

  return (
    <Layout onOpenTokenModal={handleOpenModal}>
      {isConnected ? (
        <div className="space-y-6">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "deposit" && <Deposit />}
          {activeTab === "transfer" && (
            <TokenTransfer
              onNeedTokens={() => {
                setModalOpenedFrom("auto");
                setIsModalOpen(true);
              }}
            />
          )}
          {activeTab === "mint" && <MintExternal />}

          {isModalOpen && (
            <TokensModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              openedFrom={modalOpenedFrom}
            />
          )}
        </div>
      ) : (
        <div className="bg-[#1a1b2e]/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome!</h2>
            <p className="text-gray-400 max-w-md">
              Connect your wallet to start interacting with the application.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}
