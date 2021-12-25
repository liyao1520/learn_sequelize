const Router = require("koa-router");
const { register, login, changePassword } = require("../controller/user.controller");
const {
  userValidator,
  userVerify,
  cryptPassword,
  loginVerify,
  updatePasswordVerify,
} = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");
const userRouter = new Router({ prefix: "/user" });
userRouter.post("/register", userValidator, userVerify, cryptPassword, register);
userRouter.post("/login", loginVerify, login);
userRouter.patch("/", auth, updatePasswordVerify, cryptPassword, changePassword, (ctx, next) => {
  console.log(ctx.state.user);
  console.log(ctx.request.body.password);
  ctx.body = "ok";
});
module.exports = userRouter;
