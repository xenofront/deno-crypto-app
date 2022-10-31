import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { BotService } from "./bot.service.ts";

const router = new Router();

const botService = new BotService();

router.post("/", botService.botUpdate.bind(botService));

export default router;
