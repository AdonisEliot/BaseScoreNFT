type SupplyPanelProps = {
  totalSupply: bigint;
  balance: bigint;
};

export function SupplyPanel({ totalSupply, balance }: SupplyPanelProps) {
  return (
    <section className="card section-gap">
      <div className="row">
        <div>
          <p className="subtle" style={{ marginTop: 0 }}>
            Onchain Snapshot
          </p>
          <p className="notice">Live values from Base contract reads.</p>
        </div>
      </div>
      <div className="kv">
        <span className="label">Total supply</span>
        <span className="value">{totalSupply.toString()}</span>
        <span className="label">Your badge balance</span>
        <span className="value">{balance.toString()}</span>
      </div>
    </section>
  );
}

