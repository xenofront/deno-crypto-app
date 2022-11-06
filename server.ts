import { blue, yellow } from "std/fmt/colors.ts";
import { Application } from "oak";
import { appController, botController } from "controllers/mod.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);

const app = new Application();

app.use(appController.prefix("/test").routes());
app.use(botController.prefix("/bot").routes());

console.log(blue(`app listening on port ${yellow(PORT.toString())}`));

await app.listen({ port: PORT });
