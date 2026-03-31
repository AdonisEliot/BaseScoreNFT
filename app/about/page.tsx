import { BadgeHeader } from "@/components/BadgeHeader";
import { BottomNav } from "@/components/BottomNav";
import { RuleList } from "@/components/RuleList";

export default function AboutPage() {
  return (
    <main className="app-shell">
      <BadgeHeader title="About Rules" subtitle="Current Contract Scope" />

      <section className="card section-gap">
        <RuleList
          items={[
            "Current contract supports one-time badge claim.",
            "Each wallet address can claim only once.",
            "Current version does not include onchain score-threshold verification.",
            "Score-gated logic can be added in a future upgrade.",
            "This app shows onchain claim state and offchain tracking together."
          ]}
        />
      </section>

      <section className="card section-gap">
        <p className="notice">
          Claim logic is currently based on one-time per address. UI intentionally does not claim that
          threshold validation is already enforced onchain.
        </p>
      </section>
      <BottomNav />
    </main>
  );
}

