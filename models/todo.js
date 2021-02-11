const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const todo = sequelize.define("Todo", {
  
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

const list = sequelize.define("list", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    note: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false
    },
    done :{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
});

todo.hasMany(list, { onDelete: 'cascade', hooks: true}); // каскадное удаление
list.belongsTo(todo);

// sequelize.sync({force: true}).then(result=>{
//   console.log(result);
// })
// .catch(err=> console.log(err));

module.exports = todo;
