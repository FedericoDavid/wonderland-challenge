"use client";

import { useState } from "react";
import { isAddress } from "viem";

interface AddressInputProps {
  onAddressChange: (address: string) => void;
}

export function AddressInput({ onAddressChange }: AddressInputProps) {
  const [error, setError] = useState<string>("");

  const handleAddressChange = (value: string) => {
    if (!value) {
      setError("Address is required");
      onAddressChange("");
      return;
    }

    if (!isAddress(value)) {
      setError("Invalid address format");
      onAddressChange("");
      return;
    }

    setError("");
    onAddressChange(value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Recipient Address
      </label>
      <input
        type="text"
        placeholder="0x..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => handleAddressChange(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
