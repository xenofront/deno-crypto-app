export interface ITokenRes {
  [token: string]: { usd: number };
}

export interface ICoin {
  id: string;
  symbol: string;
  investment: number;
  coinSum: number;
  hidden?: boolean;
  active: boolean;
  closed?: number;
}
