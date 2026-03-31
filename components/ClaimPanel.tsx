type ClaimPanelProps = {
  onClaim: () => Promise<void>;
  disabled: boolean;
  loading: boolean;
  txHash?: `0x${string}`;
  feedback?: string;
  error?: string;
  claimed: boolean;
};

export function ClaimPanel({
  onClaim,
  disabled,
  loading,
  txHash,
  feedback,
  error,
  claimed,
}: ClaimPanelProps) {
  return (
    <section className="card section-gap">
      <div className="col">
        <p className="subtle" style={{ marginTop: 0 }}>
          Claim Badge
        </p>
        <button
          className="btn btn-primary"
          onClick={onClaim}
          disabled={disabled}
          type="button"
        >
          {loading ? "Confirming..." : claimed ? "Already claimed" : "Claim Badge"}
        </button>
        {feedback ? <p className="notice">{feedback}</p> : null}
        {error ? <p className="notice" style={{ color: "#8d2e2e" }}>{error}</p> : null}
        {txHash ? <p className="tx mono">tx: {txHash}</p> : null}
      </div>
    </section>
  );
}

