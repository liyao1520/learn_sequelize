const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("test", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});
(async () => {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功！");
  } catch (e) {
    console.log("数据库连接失败！");
  }
})();
module.exports = sequelize;
