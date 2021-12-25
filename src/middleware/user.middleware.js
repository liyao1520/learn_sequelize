const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const { FormateError, userAlreadyExited, userDoesNotExist, userPasswordError } = require("../constants/err.type");
const { ne } = require("sequelize/lib/operators");
const userValidator = async (ctx, next) => {
  //1.获取数据
  const { user_name, password } = ctx.request.body;
  //合法性
  if (!user_name || !password) {
    console.error("用户名或者密码为空", ctx.request.body);
    ctx.app.emit("error", FormateError, ctx);
    return;
  }
  await next();
};
const userVerify = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  //合理性,是否存在用户
  if (await getUserInfo({ user_name })) {
    ctx.app.emit("error", userAlreadyExited, ctx);
    return;
  }
  await next();
};
const loginVerify = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  //1.判断用户是否存在
  //合理性,是否存在用户
  const user = await getUserInfo({ user_name });
  if (!user) {
    ctx.app.emit("error", userDoesNotExist, ctx);
    return;
  }
  //给下一个中间件用
  ctx.state.user = user;
  //2.密码是否正确
  if (!bcrypt.compareSync(password, user.password)) {
    //不正确
    ctx.app.emit("error", userPasswordError, ctx);
    return;
  }
  await next();
};
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};
const updatePasswordVerify = async (ctx, next) => {
  // 校验参数
  const { password } = ctx.request.body;
  if (typeof password !== "string") {
    return ctx.app.emit(
      "error",
      {
        code: -1,
        msg: "密码格式错误",
        result: "",
      },
      ctx
    );
  }
  await next();
};
module.exports = {
  userValidator,
  userVerify,
  cryptPassword,
  loginVerify,
  updatePasswordVerify,
};
