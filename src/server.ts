import { blue, yellow } from "fmt/colors.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { botRoute } from "./routes/index.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);
console.log(Deno.env.get("PORT"));
const app = new Application();

app.use(botRoute.routes());

app.listen({ port: PORT });

console.log(blue(`app listening on port ${yellow(String(PORT))}`));
