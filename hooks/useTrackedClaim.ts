"use client";

import { useCallback, useState } from "react";
import { Attribution } from "ox/erc8021";
import { parseEventLogs } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { baseScoreNFTAbi } from "@/lib/abi/baseScoreNFTAbi";
import { baseScoreNFTAddress } from "@/lib/contracts";
import { trackTransaction } from "@/utils/track";

export type ClaimTrackedResult = {
  txHash: `0x${string}`;
  tokenId?: bigint;
};

// Replace with real Builder Code in production release.
// BUILDER_CODE_PLACEHOLDER
export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ["BUILDER_CODE_PLACEHOLDER"],
});

export function useTrackedClaim(address?: `0x${string}`) {
  const [isClaiming, setIsClaiming] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const claimTracked = useCallback(async (): Promise<ClaimTrackedResult> => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    setIsClaiming(true);
    try {
      const txHash = await writeContractAsync({
        address: baseScoreNFTAddress,
        abi: baseScoreNFTAbi,
        functionName: "claim",
        args: [],
        dataSuffix: DATA_SUFFIX,
      } as any);

      const receipt = publicClient
        ? await publicClient.waitForTransactionReceipt({ hash: txHash })
        : undefined;

      if (receipt && receipt.status !== "success") {
        throw new Error("Transaction reverted");
      }

      // Offchain track call must not block or throw.
      void trackTransaction("app-009", "BaseScoreNFT", address, txHash);

      let tokenId: bigint | undefined;
      if (receipt?.logs?.length) {
        try {
          const events = parseEventLogs({
            abi: baseScoreNFTAbi,
            logs: receipt.logs,
            eventName: "Transfer",
          });
          const match = events.find(
            (event) => event.args.to?.toLowerCase() === address.toLowerCase()
          );
          if (typeof match?.args.id === "bigint") {
            tokenId = match.args.id;
          }
        } catch {}
      }

      return { txHash, tokenId };
    } finally {
      setIsClaiming(false);
    }
  }, [address, publicClient, writeContractAsync]);

  return { claimTracked, isClaiming };
}

