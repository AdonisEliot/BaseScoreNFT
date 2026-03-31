"use client";

import { useMemo } from "react";
import { zeroAddress } from "viem";
import { useReadContract } from "wagmi";
import { baseScoreNFTAbi } from "@/lib/abi/baseScoreNFTAbi";
import { baseScoreNFTAddress } from "@/lib/contracts";

export function useBadgeStatus(address?: `0x${string}`) {
  const supplyQuery = useReadContract({
    address: baseScoreNFTAddress,
    abi: baseScoreNFTAbi,
    functionName: "totalSupply",
  });

  const nameQuery = useReadContract({
    address: baseScoreNFTAddress,
    abi: baseScoreNFTAbi,
    functionName: "name",
  });

  const symbolQuery = useReadContract({
    address: baseScoreNFTAddress,
    abi: baseScoreNFTAbi,
    functionName: "symbol",
  });

  const claimedQuery = useReadContract({
    address: baseScoreNFTAddress,
    abi: baseScoreNFTAbi,
    functionName: "claimed",
    args: [address ?? zeroAddress],
    query: { enabled: Boolean(address) },
  });

  const balanceQuery = useReadContract({
    address: baseScoreNFTAddress,
    abi: baseScoreNFTAbi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
    query: { enabled: Boolean(address) },
  });

  const isLoading = useMemo(
    () =>
      supplyQuery.isLoading ||
      nameQuery.isLoading ||
      symbolQuery.isLoading ||
      (Boolean(address) && (claimedQuery.isLoading || balanceQuery.isLoading)),
    [
      address,
      balanceQuery.isLoading,
      claimedQuery.isLoading,
      nameQuery.isLoading,
      supplyQuery.isLoading,
      symbolQuery.isLoading,
    ]
  );

  const refresh = async () => {
    await Promise.all([
      supplyQuery.refetch(),
      nameQuery.refetch(),
      symbolQuery.refetch(),
      address ? claimedQuery.refetch() : Promise.resolve(),
      address ? balanceQuery.refetch() : Promise.resolve(),
    ]);
  };

  return {
    claimed: Boolean(claimedQuery.data),
    balance: (balanceQuery.data ?? 0n) as bigint,
    totalSupply: (supplyQuery.data ?? 0n) as bigint,
    name: (nameQuery.data ?? "BaseScoreNFT") as string,
    symbol: (symbolQuery.data ?? "BSN") as string,
    isLoading,
    refresh,
  };
}

