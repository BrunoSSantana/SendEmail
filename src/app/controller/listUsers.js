const User = require('../model/User');

module.exports = {
  async list(request, response) {
    const users = await User.find({});

    return response.render('list.njk', { users });
  },
};
