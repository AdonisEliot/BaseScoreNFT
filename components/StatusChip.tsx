type StatusChipProps = {
  claimed: boolean;
  loading?: boolean;
};

export function StatusChip({ claimed, loading }: StatusChipProps) {
  if (loading) {
    return <span className="badge-chip not-claimed">Loading</span>;
  }
  return (
    <span className={`badge-chip ${claimed ? "claimed" : "not-claimed"}`}>
      {claimed ? "Claimed" : "Not Claimed"}
    </span>
  );
}

