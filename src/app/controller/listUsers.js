const User = require('../model/User');

module.exports = {
  async list(request, response) {
    const users = await User.find({});
    console.log(users);
    return response.render('list.njk', { users });
  },
};
