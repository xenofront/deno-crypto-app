import "std/dotenv/load.ts";
import { yellow } from "std/fmt/colors.ts";
// import { Application } from "oak";
import { registerControllers } from "controllers/mod.ts";
import express, { Express } from "express";

const PORT = Number(Deno.env.get("PORT") || 3000);
const app: Express = express();

registerControllers(app);

app.listen(
  PORT,
  () =>
    console.log(
      `⚡️[server]: Server is running on http://localhost:${
        yellow(PORT.toString())
      }`,
    ),
);
