"use client";

import { zeroAddress, isAddress } from "viem";
import { toast } from "react-toastify";

import { Button } from "../common/Button";

import { useTokenOperations } from "../../_hooks/useTokenOperations";

interface TokenActionsProps {
  tokenAddress: `0x${string}`;
  tokenSymbol: string;
  decimals: number;
  amount: string;
  recipientAddress: string;
  balance: string;
  disabled?: boolean;
}

export function TokenActions({
  tokenAddress,
  tokenSymbol,
  decimals,
  amount,
  recipientAddress,
  balance,
  disabled = false,
}: TokenActionsProps) {
  const { approve, transfer, allowance, isApprovePending, isTransferPending } =
    useTokenOperations(
      tokenAddress as typeof zeroAddress,
      recipientAddress,
      decimals
    );

  const needsApproval =
    !allowance ||
    BigInt(allowance?.toString() || "0") === BigInt(0) ||
    (allowance && amount && BigInt(allowance.toString()) < BigInt(amount));

  const validateTransaction = () => {
    if (!isAddress(recipientAddress)) {
      toast.error("Invalid recipient address");
      return false;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Invalid amount");
      return false;
    }

    if (Number(amount) > Number(balance)) {
      toast.error("Insufficient balance");
      return false;
    }

    return true;
  };

  const handleApprove = () => {
    if (!validateTransaction()) return;

    try {
      approve(recipientAddress, amount);
    } catch (error: unknown) {
      toast.error(
        `Failed to approve ${tokenSymbol}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleTransfer = () => {
    if (!validateTransaction()) return;

    if (needsApproval) {
      toast.error("Need to approve token first");
      return;
    }

    try {
      transfer(recipientAddress, amount);
    } catch (error: unknown) {
      toast.error(
        `Failed to transfer ${tokenSymbol}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleApprove}
        disabled={disabled || isApprovePending || !amount || !recipientAddress}
        isLoading={isApprovePending}
      >
        {isApprovePending ? "Approving..." : `Approve ${tokenSymbol}`}
      </Button>

      <Button
        onClick={handleTransfer}
        disabled={
          disabled ||
          isTransferPending ||
          !amount ||
          !recipientAddress ||
          Boolean(needsApproval)
        }
        isLoading={isTransferPending}
        variant="secondary"
      >
        {isTransferPending ? "Transferring..." : `Transfer ${tokenSymbol}`}
      </Button>
    </div>
  );
}
