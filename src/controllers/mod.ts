import { botController } from "controllers/telegram-bot/bot.controller.ts";
import { appController } from "controllers/app/app.controller.ts";
import { Application } from "oak";

const controllers = [botController, appController];

export const registerControllers = (app: Application) => {
  for (const c of controllers) {
    app.use(c.routes());
  }
};
