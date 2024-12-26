import { useAccount } from "wagmi";

import { WalletConnect } from "./web3/WalletConnect";
import { Button } from "./common/Button";

interface NavbarProps {
  onOpenTokenModal: () => void;
}

export function Navbar({ onOpenTokenModal }: NavbarProps) {
  const { isConnected } = useAccount();

  return (
    <nav className="flex items-center justify-between mb-10">
      <div className="flex-1" />

      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold leading-none">Wonderland</h1>
        <h5 className="text-sm font-bold">Web3 Challenge</h5>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        {isConnected && (
          <Button onClick={onOpenTokenModal} variant="secondary">
            No Tokens?
          </Button>
        )}
        <WalletConnect />
      </div>
    </nav>
  );
}
