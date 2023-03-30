import { Request, Response, Router } from "express";
import AppService from "controllers/app/app.service.ts";

const appController = Router();

appController.get(
  "/app",
  (_req: Request, res: Response) => AppService.appTest(res),
);

export { appController };
