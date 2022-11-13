import { Context, Router } from "oak";

const router = new Router();

router.get("/app", (ctx: Context) => {
  ctx.response.body = "alive";
  ctx.response.status = 200;
});

export default router;
