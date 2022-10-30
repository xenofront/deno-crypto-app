import { Router } from "oak";
import * as botController from "src/controllers/index.ts";

export const botRoute = new Router();

botRoute.post("/bot", botController.botUpdate);
