module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'Admin',
      email: 'ekrausnunes@gmail.com',
      password: '$2y$10$79pISkfBa7IpQFqipnDs0ebw3sG7nGg6lY7N5TdSqTcI2M3eaOW7a',
      active: true,
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', [{
      name: 'Admin'
    }])
  }
};