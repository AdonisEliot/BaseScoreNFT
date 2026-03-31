import { StatusChip } from "./StatusChip";

type BadgeCardProps = {
  name: string;
  symbol: string;
  claimed: boolean;
  balance: bigint;
  loading?: boolean;
};

export function BadgeCard({ name, symbol, claimed, balance, loading }: BadgeCardProps) {
  return (
    <section className="proof-card section-gap">
      <h3 className="proof-title">{loading ? "Loading badge..." : name || "Base Score Badge"}</h3>
      <div style={{ marginTop: 10 }}>
        <StatusChip claimed={claimed} loading={loading} />
      </div>
      <div className="kv">
        <span className="label">Badge name</span>
        <span className="value">{name || "-"}</span>
        <span className="label">Badge symbol</span>
        <span className="value">{symbol || "-"}</span>
        <span className="label">Claim state</span>
        <span className="value">{claimed ? "Claimed" : "Not claimed yet"}</span>
        <span className="label">Current balance</span>
        <span className="value">{balance.toString()}</span>
      </div>
    </section>
  );
}

