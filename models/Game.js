const Sequelize = require('sequelize');
const db = require('../db/connection');

const Game = db.define('game', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  publisher: {
    type: Sequelize.STRING,
  },
  new_game: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Game