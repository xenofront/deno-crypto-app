import { Context } from "oak";

export class AppService {
  public static botTest(ctx: Context) {
    ctx.response.body = "alive";
    ctx.response.status = 200;
  }
}
