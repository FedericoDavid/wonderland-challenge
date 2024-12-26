import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import { Button } from "../_components/common/Button";

export function Deposit() {
  const { address } = useAccount();

  const handleCopy = () => {
    navigator.clipboard.writeText(address || "");
    toast.success("Address copied to clipboard!");
  };

  return (
    <div className="bg-[#1a1b2e]/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-2 text-white">Deposit</h2>
      <p className="text-gray-400 mb-6">Need to deposit some DAI or USDC?</p>

      <div className="flex items-center gap-4">
        <div className="flex-1 px-4 py-3 bg-black/20 rounded-lg border border-gray-700">
          <span className="text-gray-300 font-mono">{address}</span>
        </div>
        <Button onClick={handleCopy}>Copy</Button>
      </div>
    </div>
  );
}
