import { Context, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.response.body = "hello";
  ctx.response.status = 200;
});

export default router;
