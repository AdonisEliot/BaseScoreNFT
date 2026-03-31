"use client";

import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { BadgeHeader } from "@/components/BadgeHeader";
import { ClaimPanel } from "@/components/ClaimPanel";
import { SupplyPanel } from "@/components/SupplyPanel";
import { WalletButton } from "@/components/WalletButton";
import { BottomNav } from "@/components/BottomNav";
import { StatusChip } from "@/components/StatusChip";
import { useBadgeStatus } from "@/hooks/useBadgeStatus";
import { useTrackedClaim } from "@/hooks/useTrackedClaim";

function shortAddress(value?: string) {
  if (!value) return "Not connected";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function getFriendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  if (lower.includes("already claimed")) return "Already claimed for this address.";
  if (lower.includes("user rejected")) return "Transaction was canceled in wallet.";
  return "Claim failed. Please try again in a moment.";
}

export default function HomePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { claimed, balance, totalSupply, isLoading, refresh } = useBadgeStatus(address);
  const { claimTracked, isClaiming } = useTrackedClaim(address);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");

  const canClaim = useMemo(
    () => Boolean(isConnected && !isClaiming && !claimed),
    [claimed, isClaiming, isConnected]
  );

  const onClaim = async () => {
    setError("");
    setFeedback("");
    try {
      const result = await claimTracked();
      setTxHash(result.txHash);
      setFeedback(
        result.tokenId !== undefined
          ? `Badge claimed successfully. Token #${result.tokenId.toString()}`
          : "Badge claimed successfully."
      );
      await refresh();
      router.push("/badge");
    } catch (claimError) {
      setError(getFriendlyError(claimError));
    }
  };

  return (
    <main className="app-shell">
      <BadgeHeader title="BaseScoreNFT" subtitle="Achievement Badge Claim" />

      <section className="card section-gap">
        <div className="row">
          <div>
            <h1 className="title-main">Base Score Badge</h1>
            <p className="subtle">One-time onchain claim for each wallet address.</p>
          </div>
          <StatusChip claimed={claimed} loading={isLoading} />
        </div>
      </section>

      <section className="card section-gap">
        <div className="col">
          <div className="row">
            <span className="subtle">Wallet</span>
            <span className="mono">{shortAddress(address)}</span>
          </div>
          <WalletButton />
          <p className="notice">
            {isConnected
              ? claimed
                ? "Already claimed for this wallet."
                : "Wallet connected. You can claim now."
              : "Connect wallet to check claim status."}
          </p>
        </div>
      </section>

      <ClaimPanel
        onClaim={onClaim}
        disabled={!canClaim}
        loading={isClaiming}
        txHash={txHash}
        feedback={feedback}
        error={error}
        claimed={claimed}
      />

      <SupplyPanel totalSupply={totalSupply} balance={balance} />
      <BottomNav />
    </main>
  );
}

