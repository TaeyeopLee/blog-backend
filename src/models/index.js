const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('practice_db', '', '', {
  host: '3.37.219.59',
  port: '3306',
  dialect: 'mysql'
});

const Blog = db.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
  },
},{

});

(async () => {
  await db.sync({alter: true});
})();
console.log("The table for the Blog model was just (re)created!");

module.exports = Blog;
