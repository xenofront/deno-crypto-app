import { MessageUpdate, TelegramBot, UpdateType } from "telegram-bot";
import { Context } from "oak";
import { ICoin, ITokenRes } from "controllers/telegram-bot/bot.interface.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

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

    const myId = Deno.env.get("MY_TELEGRAM_ID");
    console.log(myId);
    if (
      update.message.from?.id !== myId ||
      update.message.text?.toLowerCase() !== "/stats"
    ) {
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
    const ids = Deno.env.get("IDS");
    const coinGeckoUri = Deno.env.get("COIN_GECKO_URI");

    const res = await fetch(
      `${coinGeckoUri}/price?ids=${ids}&vs_currencies=usd`,
    );
    const tokens: ITokenRes = await res.json();

    const coins: ICoin[] = JSON.parse(Deno.env.get("COINS") as string);

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
  }

  private _convertToHtml(
    coins: Array<ICoin & { currentPrice: number; currentSymbolPrice: number }>,
  ) {
    let res = "";
    let sumInvestments = 0;
    let sumCurrentPrice = 0;

    coins.forEach((c) => {
      sumInvestments += c.investment;
      sumCurrentPrice += c.currentPrice;

      res += `
👉 <b>${c.symbol.toUpperCase()}</b>
CS ${this._toCurrency(c.currentPrice)}
II ${this._toCurrency(c.investment)}
CP ${c.currentSymbolPrice.toFixed(3)}
IP ${(c.investment / c.coinSum).toFixed(3)}
D ${this._toCurrency(Math.round(c.currentPrice - c.investment))}
D% ${
        (Math.round(c.currentPrice - c.investment) / c.investment * 100)
          .toFixed(
            1,
          )
      }%\n`;
    });

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
}

export default new BotService();
