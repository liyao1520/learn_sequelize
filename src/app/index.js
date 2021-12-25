const Koa = require("koa");
const koaBody = require("koa-body");

const userRouter = require("../router/user.route");

const app = new Koa();
app.use(koaBody());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
//同意错误处理
app.on("error", (err, ctx) => {
  console.error(err);
  ctx.body = err;
});
module.exports = app;
