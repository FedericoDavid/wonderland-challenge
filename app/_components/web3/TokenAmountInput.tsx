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
      <div className="flex justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Amount ({symbol})
        </label>
        <span className="text-sm text-gray-500">
          Balance: {balance} {symbol}
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="0.0"
          value={currentAmount}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          onChange={(e) => handleAmountChange(e.target.value)}
        />
        <button
          onClick={() => handleAmountChange(balance)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:text-blue-600"
          type="button"
          disabled={disabled}
        >
          MAX
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
