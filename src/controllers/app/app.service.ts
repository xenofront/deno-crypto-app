// import { Context } from "oak";

class AppService {
  public async appTest(res) {
    res.status(200).send("ok");
    const result = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    );

    const tokens: ITokenRes = await result.json();
    console.log(tokens);
  }
}

export default new AppService();
