import { Context, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import BotService from "./bot.service.ts";

const router = new Router();

router.post("/", (ctx: Context) => BotService.botUpdate(ctx));

export default router;
