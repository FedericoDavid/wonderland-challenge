"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { Button } from "../common/Button";

export function WalletConnect() {
  const [mounted, setMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Button>Loading...</Button>;

  return (
    <Button onClick={() => open({ view: "Connect" })}>
      {isConnected && address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}
