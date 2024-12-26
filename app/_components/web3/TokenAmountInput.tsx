import { useState } from "react";

interface TokenAmountInputProps {
  symbol: string;
  balance: string;
  decimals: number;
  onAmountChange: (amount: string) => void;
  currentAmount: string;
  disabled?: boolean;
}

export function TokenAmountInput({
  symbol,
  balance,
  decimals,
  onAmountChange,
  currentAmount,
  disabled = false,
}: TokenAmountInputProps) {
  const [error, setError] = useState<string>("");

  const handleAmountChange = (value: string) => {
    if (!value) {
      setError("");
      onAmountChange("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Invalid amount format");
      onAmountChange("");
      return;
    }

    const parts = value.split(".");
    if (parts[1] && parts[1].length > decimals) {
      setError(`Maximum ${decimals} decimal places`);
      return;
    }

    if (Number(value) > Number(balance)) {
      setError("Insufficient balance");
      onAmountChange(value);
      return;
    }

    setError("");
    onAmountChange(value);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-gray-300">
        <label className="text-sm font-medium">Amount ({symbol})</label>
        <span className="text-sm opacity-75">
          Balance: {balance} {symbol}
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="0.0"
          value={currentAmount}
          disabled={disabled}
          className="w-full px-4 py-3 bg-black/20 border border-gray-700 rounded-lg 
                 text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          onChange={(e) => handleAmountChange(e.target.value)}
        />
        <button
          onClick={() => handleAmountChange(balance)}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm
                 text-blue-400 hover:text-blue-300 disabled:opacity-50 
                 transition-colors duration-200"
        >
          MAX
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
