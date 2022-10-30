import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as botController from "src/controllers/index.ts";

export const botRoute = new Router();

botRoute.post("/bot", botController.botUpdate);
