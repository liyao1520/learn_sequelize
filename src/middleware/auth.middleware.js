const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const { TokenExpiredError, JsonWebTokenError } = require("../constants/err.type");
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, PUBLIC_KEY);
    ctx.state.user = user;
  } catch (e) {
    switch (e.name) {
      case "TokenExpiredError":
        return ctx.app.emit("error", TokenExpiredError, ctx);
      case "JsonWebTokenError":
        return ctx.app.emit("error", JsonWebTokenError, ctx);
      default:
        return ctx.app.emit("error", JsonWebTokenError, ctx);
    }
  }

  await next();
};

module.exports = {
  auth,
};
