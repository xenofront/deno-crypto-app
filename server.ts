import { blue, yellow } from "https://deno.land/std@0.157.0/fmt/colors.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
// import { appController } from "./src/controllers/mod.ts";

const PORT = Number(Deno.env.get("PORT") || 3000);

const app = new Application();
const router = new Router();
app.use(router.routes());

// app.use(appController.prefix("/test").routes());
// app.use(botController.prefix("/bot").routes());

app.listen({ port: PORT });

console.log(blue(`app listening on port ${yellow(String(PORT))}`));
