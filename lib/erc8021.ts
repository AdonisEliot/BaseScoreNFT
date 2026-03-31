import { stringToHex } from "viem";

type DataSuffixInput = {
  codes: string[];
};

export const Attribution = {
  toDataSuffix({ codes }: DataSuffixInput): `0x${string}` {
    const payload = `erc8021:${codes.join(",")}`;
    return stringToHex(payload);
  },
};

