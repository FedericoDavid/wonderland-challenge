"use client";

import { WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "../_config/wagmi";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
