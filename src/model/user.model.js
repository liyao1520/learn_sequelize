const { DataTypes } = require("sequelize");
const sequelize = require("../db/seq");
const User = sequelize.define("User", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名唯一",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户密码",
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员",
  },
});
(async () => {
  await User.sync();
})();
module.exports = User;
