import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export class AppService {
  public static botTest(ctx: Context) {
    ctx.response.body = "hello";
    ctx.response.status = 200;
  }
}
