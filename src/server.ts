import { blue, yellow } from "fmt/colors.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { Application } from "oak";
import { envNames } from "env";
import { botRoute } from "src/routes/index.ts";

config({ export: true });

const PORT = Number(Deno.env.get(envNames.PORT) || 3000);

const app = new Application();

app.use(botRoute.routes());

app.listen({ port: PORT });

console.log(blue(`app listening on port ${yellow(String(PORT))}`));
