export interface ITokenRes {
  [token: string]: { usd: number };
}

export interface ICoin {
  name: string;
  symbol: string;
  investment: number;
  coinSum: number;
}
