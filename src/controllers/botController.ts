import { MessageUpdate, TelegramBot, UpdateType } from "telegram-bot";
import { Request, Response } from "oak";
import { config } from "config";
import { envNames } from "env";

config({ export: true });

const token = Deno.env.get(envNames.TELEGRAM_TOKEN) as string;
const ids = Deno.env.get(envNames.IDS) as string;
const coinGeckoUri = Deno.env.get(envNames.COIN_GECKO_URI) as string;

const bot = new TelegramBot(token);

bot.on(UpdateType.Message, async ({ message }) => {
  const { chat: { id }, text } = message;

  await bot.sendMessage({
    chat_id: id,
    text: text || "",
    parse_mode: "HTML",
  });
});

export const botUpdate = async (
  { request, response }: { request: Request; response: Response },
) => {
  const update: MessageUpdate = await request.body().value;

  response.status = 200;
  if (
    update.message.from?.id !== 608962901 ||
    update.message.text?.toLocaleLowerCase() !== "/stats"
  ) {
    return;
  }

  const state = await getCurrentState();
  const html = convertToHtml(state);

  bot.handleUpdate({ ...update, message: { ...update.message, text: html } });
};

const getCurrentState = async (): Promise<
  Array<ICoin & { currentPrice: number; currentSymbolPrice: number }>
> => {
  const res = await fetch(
    `${coinGeckoUri}/price?ids=${ids}&vs_currencies=usd`,
  );
  const tokens: ITokenRes = await res.json();

  const coins: ICoin[] = JSON.parse(Deno.env.get(envNames.COINS) as string);

  return coins.map((x) => {
    const currentPrice =
      Math.round((tokens[x.name.toLowerCase()].usd * x.coinSum) * 100) / 100;

    return {
      ...x,
      coinSum: (x.coinSum * 100) / 100,
      currentPrice,
      currentSymbolPrice: tokens[x.name.toLowerCase()].usd,
    };
  });
};

const convertToHtml = (
  coins: Array<ICoin & { currentPrice: number; currentSymbolPrice: number }>,
) => {
  let res = "";
  let sumInvestments = 0;
  let sumCurrentPrice = 0;

  coins.forEach((c) => {
    sumInvestments += c.investment;
    sumCurrentPrice += c.currentPrice;

    res += `
👉 <b>${c.symbol.toUpperCase()}</b>
CS ${toCurrency(c.currentPrice)}
II ${toCurrency(c.investment)}
CP ${c.currentSymbolPrice.toFixed(3)}
IP ${(c.investment / c.coinSum).toFixed(3)}
D ${toCurrency(Math.round(c.currentPrice - c.investment))}
D% ${
      (Math.round(c.currentPrice - c.investment) / c.investment * 100).toFixed(
        1,
      )
    }%\n`;
  });

  res += `
👉 <b>SUMMARY</b>
CS ${toCurrency(sumCurrentPrice)}
II ${toCurrency(sumInvestments)}
D ${toCurrency(sumCurrentPrice - sumInvestments)}
D% ${
    Math.round((sumCurrentPrice - sumInvestments) / sumInvestments * 100)
      .toFixed(
        1,
      )
  }
`;

  return res;
};

const toCurrency = (num: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    .format(num);

interface ITokenRes {
  [token: string]: { usd: number };
}

interface ICoin {
  name: string;
  symbol: string;
  investment: number;
  coinSum: number;
}