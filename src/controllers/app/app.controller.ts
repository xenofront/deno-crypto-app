import { Context, Router } from "oak";

const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.response.body = "alive";
  ctx.response.status = 200;
});

export default router;
