import { blue, yellow } from "https://deno.land/std@0.157.0/fmt/colors.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { botRoute } from "../src/routes/index.ts";

const env = config({ export: true });

const PORT = Number(env.PORT || 3000);

const app = new Application();

app.use(botRoute.routes());

app.listen({ port: PORT });

console.log(blue(`app listening on port ${yellow(String(PORT))}`));
