import { blue, yellow } from "https://deno.land/std@0.157.0/fmt/colors.ts";
import { config } from "https://deno.land/std@0.161.0/dotenv/mod.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { botRoute } from "./routes/index.ts";

const env = await config({ export: true });

const PORT = Number(env.PORT || 3000);

const app = new Application();

app.use(botRoute.routes());

app.listen({ port: PORT });

console.log(blue(`app listening on port ${yellow(String(PORT))}`));
