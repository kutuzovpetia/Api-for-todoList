const Sequelize = require('sequelize');

const DB_NAME = 'node-todo';
const USER_NAME = ''; 
const PASSWORD = '';


const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: '192.168.1.126',
    dialect: 'mysql',
    define: {timestamps: false} // Не показывает дату создания и обновления
});

module.exports = sequelize;
