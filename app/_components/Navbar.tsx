import { WalletConnect } from "./web3/WalletConnect";

interface NavbarProps {
  onOpenTokenModal: () => void;
}

export function Navbar({ onOpenTokenModal }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between mb-8">
      <div className="flex-1" />

      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold leading-none">Wonderland</h1>
        <h5 className="text-sm font-bold">Web3 Challenge</h5>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <button
          onClick={() => onOpenTokenModal()}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          No Tokens?
        </button>
        <WalletConnect />
      </div>
    </nav>
  );
}
