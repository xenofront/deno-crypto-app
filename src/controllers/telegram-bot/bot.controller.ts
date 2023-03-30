import { Request, Response, Router } from "express";
import BotService from "controllers/telegram-bot/bot.service.ts";

const botController = Router();

botController.post(
  "/bot",
  (req: Request, res: Response) => BotService.botUpdate(req, res),
);

export { botController };
