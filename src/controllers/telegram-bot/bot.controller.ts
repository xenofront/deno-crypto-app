import { Router } from "oak";
import BotService from "controllers/telegram-bot/bot.service.ts";

const botController = new Router();

botController.post("/bot", (ctx) => BotService.botUpdate(ctx));

export { botController };
