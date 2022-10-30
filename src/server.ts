import { blue, yellow } from "fmt/colors.ts";
import { Application } from "oak";
import { botRoute } from "./routes/index.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);

const app = new Application();

app.use(botRoute.routes());

app.listen({ port: PORT });

console.log(blue(`app listening on port ${yellow(String(PORT))}`));
