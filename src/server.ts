import { blue, yellow } from "https://deno.land/std@0.157.0/fmt/colors.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { botRoute } from "./routes/index.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);

const app = new Application();

app.use(botRoute.routes());

app.listen({ port: PORT });

console.log(blue(`app listening on port ${yellow(String(PORT))}`));
