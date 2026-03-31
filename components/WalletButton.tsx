"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, isPending } = useConnect();

  if (isConnected) {
    return (
      <button className="btn btn-outline" type="button" onClick={() => disconnect()}>
        Disconnect Wallet
      </button>
    );
  }

  const connector = connectors[0];
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => connector && connect({ connector })}
      disabled={!connector || isPending}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

