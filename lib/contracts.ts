import type { Address } from "viem";
import { baseScoreNFTAbi } from "./abi/baseScoreNFTAbi";

export const BASESCORENFT_CONTRACT_ADDRESS_PLACEHOLDER =
  "BASESCORENFT_CONTRACT_ADDRESS_PLACEHOLDER";

const configuredAddress =
  process.env.NEXT_PUBLIC_BASESCORENFT_CONTRACT_ADDRESS ??
  BASESCORENFT_CONTRACT_ADDRESS_PLACEHOLDER;

export const baseScoreNFTAddress = (
  configuredAddress === BASESCORENFT_CONTRACT_ADDRESS_PLACEHOLDER
    ? "0xf02A789e0DcFE5fE579594005219188e3d0F2798"
    : configuredAddress
) as Address;

export const baseScoreNFTContract = {
  address: baseScoreNFTAddress,
  abi: baseScoreNFTAbi,
} as const;

