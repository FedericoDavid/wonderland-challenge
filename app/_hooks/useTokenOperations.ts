"use client";

import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { erc20Abi, zeroAddress, parseUnits } from "viem";
import { toast } from "react-toastify";

export function useTokenOperations(
  tokenAddress: typeof zeroAddress,
  spenderAddress: string | undefined,
  decimals: number
) {
  const { address: userAddress } = useAccount();
  const { writeContract: approve, isPending: isApprovePending } =
    useWriteContract({
      mutation: {
        onSuccess: () => {
          toast.success("Token approved successfully! 👌");
          refetchAllowance();
        },
        onError: (error) => {
          toast.error(`Failed to approve token: ${error.message}`);
        },
      },
    });

  const { writeContract: transfer, isPending: isTransferPending } =
    useWriteContract({
      mutation: {
        onSuccess: () => {
          toast.success("Transfer completed successfully! 👌");
        },
        onError: (error) => {
          toast.error(`Failed to transfer token: ${error.message}`);
        },
      },
    });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args:
      userAddress && spenderAddress
        ? [userAddress as `0x${string}`, spenderAddress as `0x${string}`]
        : undefined,
  });

  const handleApprove = async (spenderAddress: string, amount: string) => {
    const parsedAmount = parseUnits(amount, decimals);

    try {
      approve({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [spenderAddress as typeof zeroAddress, parsedAmount],
      });
    } catch (error) {
      console.error("Approve failed:", error);
      throw error;
    }
  };

  const handleTransfer = async (toAddress: string, amount: string) => {
    const parsedAmount = parseUnits(amount, decimals);

    try {
      transfer({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [toAddress as typeof zeroAddress, parsedAmount],
      });
    } catch (error) {
      console.error("Transfer failed:", error);
      throw error;
    }
  };

  return {
    approve: handleApprove,
    transfer: handleTransfer,
    allowance,
    isApprovePending,
    isTransferPending,
  };
}
