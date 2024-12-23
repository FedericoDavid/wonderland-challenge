export const SUPPORTED_CHAINS = {
  SEPOLIA: 11155111,
  MUMBAI: 80001,
} as const;

export const TOKEN_CONTRACTS = {
  [SUPPORTED_CHAINS.SEPOLIA]: {
    DAI: {
      address: "0x1D70D57ccD2798323232B2dD027B3aBcA5C00091",
      decimals: 18,
      symbol: "DAI",
    },
    USDC: {
      address: "0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47",
      decimals: 6,
      symbol: "USDC",
    },
  },
} as const;
