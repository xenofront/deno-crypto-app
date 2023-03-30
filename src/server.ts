import "std/dotenv/load.ts";
import { blue, yellow } from "std/fmt/colors.ts";
import { Application } from "oak";
import { registerControllers } from "controllers/mod.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);

const app = new Application();
registerControllers(app);

const isDev = Deno.env.get("ENVIRONMENT") === "dev";
console.log(
  blue(
    isDev ? `http://localhost:${yellow(PORT.toString())}` : "app is listening",
  ),
);

await app.listen({ port: PORT });
