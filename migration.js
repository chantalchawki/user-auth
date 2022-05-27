const User = require('./models/user');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

exports.generateUsers = async () => {
    const hashedPassword = await bcrypt.hash('Test123', 10);
    
    const user1 = new User({username: faker.internet.userName(), password: hashedPassword, role: "User"});
    await user1.save();

    const user2 = new User({username: faker.internet.userName(), password: hashedPassword, role: "User"});
    await user2.save();

    const user3 = new User({username: faker.internet.userName(), password: hashedPassword, role: "Admin"});
    await user3.save();

    const user4 = new User({username: faker.internet.userName(), password: hashedPassword, role: "Admin"});
    await user4.save();
}
