"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { BadgeHeader } from "@/components/BadgeHeader";
import { BadgeCard } from "@/components/BadgeCard";
import { WalletButton } from "@/components/WalletButton";
import { BottomNav } from "@/components/BottomNav";
import { useBadgeStatus } from "@/hooks/useBadgeStatus";

function shortAddress(value?: string) {
  if (!value) return "Not connected";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export default function BadgePage() {
  const { address } = useAccount();
  const { claimed, balance, name, symbol, isLoading } = useBadgeStatus(address);

  return (
    <main className="app-shell">
      <BadgeHeader title="Your Badge" subtitle="Collectible Proof Card" />

      <section className="card section-gap">
        <div className="row">
          <span className="subtle">Current Address</span>
          <span className="mono">{shortAddress(address)}</span>
        </div>
      </section>

      <BadgeCard
        name={name}
        symbol={symbol}
        claimed={claimed}
        balance={balance}
        loading={isLoading}
      />

      <section className="card section-gap">
        <Link href="/" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          Back to Claim
        </Link>
        <div style={{ marginTop: 10 }}>
          <WalletButton />
        </div>
      </section>
      <BottomNav />
    </main>
  );
}

