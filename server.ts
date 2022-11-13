import { blue, yellow } from "std/fmt/colors.ts";
import { Application } from "oak";
import { controllers } from "controllers/mod.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);

const app = new Application();

for (const c of controllers) {
  app.use(c.routes());
}

console.log(blue(`http://localhost:${yellow(PORT.toString())}`));

await app.listen({ port: PORT });
