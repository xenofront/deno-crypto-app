import { Context, Router } from "oak";
import BotService from "controllers/telegram-bot/bot.service.ts";

const router = new Router();

router.post("/bot", (ctx: Context) => BotService.botUpdate(ctx));

export default router;
