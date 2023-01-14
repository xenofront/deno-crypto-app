import { Router } from "oak";
import AppService from "controllers/app/app.service.ts";

const appController = new Router();

appController.get("/app", (ctx) => AppService.appTest(ctx));

export { appController };
