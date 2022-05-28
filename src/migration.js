const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('./models/user');
const { logger } = require('./config/logger');

exports.generateUsers = async () => {
  try {
    const foundUsers = await User.find({});
    if (foundUsers.length === 0) {
      logger.info('Migrate users Started');
      const hashedPassword = await bcrypt.hash('Test123', 10);
      const user1 = new User({ username: faker.internet.userName(), password: hashedPassword, role: 'User' });
      await user1.save();

      const user2 = new User({ username: faker.internet.userName(), password: hashedPassword, role: 'User' });
      await user2.save();

      const user3 = new User({ username: faker.internet.userName(), password: hashedPassword, role: 'Admin' });
      await user3.save();

      const user4 = new User({ username: faker.internet.userName(), password: hashedPassword, role: 'Admin' });
      await user4.save();
    }
  } catch (err) {
    logger.error('Error migrating users');
  }
};
