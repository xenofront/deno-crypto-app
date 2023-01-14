import { Context } from "oak";

class AppService {
  public appTest(ctx: Context) {
    ctx.response.body = "alive";
    ctx.response.status = 200;
  }
}

export default new AppService();
