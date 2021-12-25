const User = require("../model/user.model");
class UserService {
  async createUser(user_name, password) {
    //插入数据
    const user = await User.create({
      user_name,
      password,
    });
    return user.dataValues;
  }
  async getUserInfo(findOpt) {
    const res = await User.findOne({
      where: findOpt,
    });

    return res ? res.dataValues : null;
  }
  async updateById({ id, user_name, password, is_admin }) {
    const newUser = Object.create(null);
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });
    const res = await User.update(newUser, {
      where: {
        id,
      },
    });
    return Boolean(res[0]);
  }
}
module.exports = new UserService();
