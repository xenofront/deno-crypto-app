import { MessageUpdate, TelegramBot, UpdateType } from "telegram-bot";
import { Context } from "oak";
import {
  ICoin,
  IOtherExpense,
  ITokenRes,
} from "controllers/telegram-bot/bot.interface.ts";

class BotService {
  private _bot: TelegramBot;

  constructor() {
    this._bot = new TelegramBot(Deno.env.get("TELEGRAM_TOKEN") as string);

    this._bot.on(UpdateType.Message, async ({ message }) => {
      const { chat: { id }, text } = message;

      await this._bot.sendMessage({
        chat_id: id,
        text: text || "",
        parse_mode: "HTML",
      });
    });
  }

  public async botUpdate(ctx: Context) {
    const { request, response } = ctx;
    const update: MessageUpdate = await request.body().value;

    response.status = 200;

    if (update.message.text?.toLowerCase() !== "/stats") {
      return;
    }

    const state = await this._getCurrentState();
    const html = this._convertToHtml(state);

    this._bot.handleUpdate({
      ...update,
      message: { ...update.message, text: html },
    });
  }

  private async _getCurrentState(): Promise<
    Array<ICoin & { currentPrice: number; currentSymbolPrice: number }>
  > {
    const coins: ICoin[] = JSON.parse(Deno.env.get("COINS") as string);
    const ids = coins
      .filter((coin) => coin.active)
      .map((coin) => coin.id)
      .join(",");

    const coinGeckoUri = Deno.env.get("COIN_GECKO_URI");

    const res = await fetch(
      `${coinGeckoUri}price?ids=${ids}&vs_currencies=usd`,
    );
    const tokens: ITokenRes = await res.json();
    console.log(tokens);
    return coins.map((x) => {
      const currentSymbolPrice = tokens[x.id.toLowerCase()].usd;
      const currentPrice = Math.round((currentSymbolPrice * x.coinSum) * 100) /
        100;

      return {
        ...x,
        coinSum: (x.coinSum * 100) / 100,
        currentPrice,
        currentSymbolPrice,
      };
    });
  }

  private _convertToHtml(
    coins: Array<ICoin & { currentPrice: number; currentSymbolPrice: number }>,
  ) {
    let res = "";
    let sumInvestments = 0;
    let sumCurrentPrice = 0;

    for (const c of coins) {
      if (!c.active) {
        sumInvestments += c.investment;
        sumCurrentPrice += c.closed ?? 0;
        continue;
      }

      sumInvestments += c.investment;
      sumCurrentPrice += c.currentPrice;

      if (c.hidden) {
        continue;
      }

      res += `
👉 <b>${c.symbol.toUpperCase()}</b>
CS ${this._toCurrency(c.currentPrice)}
COINS ${new Intl.NumberFormat("el-GR").format(c.coinSum)}
II ${this._toCurrency(c.investment)}
CP ${c.currentSymbolPrice.toFixed(4)}
IP ${(c.investment / c.coinSum).toFixed(4)}
D ${this._toCurrency(Math.round(c.currentPrice - c.investment))}
D% ${
        (Math.round(c.currentPrice - c.investment) / c.investment * 100)
          .toFixed(
            1,
          )
      }\n`;
    }

    const hiddenExpenses = coins.filter((coin) => coin.hidden);

    if (hiddenExpenses.length) {
      const expenses = this._getHiddenExpenses(coins, hiddenExpenses);
      res += `
👉 <b>HIDDEN EXPENSES</b>
CS ${this._toCurrency(expenses.CS)}
II ${this._toCurrency(expenses.II)}
D ${this._toCurrency(expenses.CS - expenses.II)}
D% ${
        Math.round((expenses.CS - expenses.II) / expenses.II * 100)
          .toFixed(
            1,
          )
      }
      `;
    }

    res += `
👉 <b>SUMMARY</b>
CS ${this._toCurrency(sumCurrentPrice)}
II ${this._toCurrency(sumInvestments)}
D ${this._toCurrency(sumCurrentPrice - sumInvestments)}
D% ${
      Math.round((sumCurrentPrice - sumInvestments) / sumInvestments * 100)
        .toFixed(
          1,
        )
    }
    `;

    return res;
  }

  private _toCurrency(num: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(num);
  }

  private _getHiddenExpenses(
    coins: Array<ICoin & { currentPrice: number; currentSymbolPrice: number }>,
    hiddenExpenses: IOtherExpense[],
  ) {
    return coins.reduce((acc, curr) => {
      if (!hiddenExpenses.some((c) => c.symbol === curr.symbol)) {
        return acc;
      }
      return {
        CS: acc.CS += curr.currentPrice,
        II: acc.II += curr.investment,
      };
    }, { CS: 0, II: 0 });
  }
}

export default new BotService();
