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
      <label className="block text-sm font-medium text-gray-300">
        Recipient Address
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="0x..."
          className="w-full px-4 py-3 bg-black/20 border border-gray-700 rounded-lg 
                   text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200"
          onChange={(e) => handleAddressChange(e.target.value)}
        />
        {error && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </span>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400 font-medium tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
}
