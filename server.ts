import { blue, yellow } from "https://deno.land/std@0.157.0/fmt/colors.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { appController, botController } from "./src/controllers/mod.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);

const app = new Application();

app.use(appController.prefix("/test").routes());
app.use(botController.prefix("/bot").routes());

console.log(blue(`app listening on port ${yellow(String(PORT))}`));

await app.listen({ port: PORT });
