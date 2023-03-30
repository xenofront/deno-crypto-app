import { Context } from "oak";

class AppService {
  public appTest(ctx: Context) {
    const ids = Deno.env.get("IDS");
    const coinGeckoUri = Deno.env.get("COIN_GECKO_URI");

    console.log(`${coinGeckoUri}/price?ids=${ids}&vs_currencies=usd`);

    ctx.response.body = "alive";
    ctx.response.status = 200;
  }
}

export default new AppService();
