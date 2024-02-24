export interface ITokenRes {
  [token: string]: { usd: number };
}

export interface ICoin {
  name: string;
  symbol: string;
  investment: number;
  coinSum: number;
  hidden?: boolean;
  active: boolean;
  closed?: number;
}

export interface IOtherExpense {
  symbol: string;
}
