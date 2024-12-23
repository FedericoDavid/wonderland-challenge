export interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

export interface TokenBalance {
  token: Token;
  balance: bigint;
  formatted: string;
}

export interface TokenOperation {
  token: Token;
  amount: string;
  recipient: string;
}
