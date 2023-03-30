import { botController } from "controllers/telegram-bot/bot.controller.ts";
// import { appController } from "controllers/app/app.controller.ts";
import { Express } from 'express';

const controllers = [botController];

export const registerControllers = (app: Express) => {
  for (const c of controllers) {
    app.use(c);
  }
};
