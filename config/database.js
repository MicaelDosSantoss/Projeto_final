
module.exports = {
  development: {
    username: 'root',
    password: null, // Adicione a senha, se necessário
    database: 'glass_inventory',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null, // Adicione a senha, se necessário
    database: 'glass_inventory_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null, // Adicione a senha, se necessário
    database: 'glass_inventory_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};