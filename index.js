const express    = require('express');
const exphbs     = require('express-handlebars').engine;
const index      = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Game        = require('./models/Game');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

const PORT = 3000;

index.listen(PORT, function() {
  console.log(`The express in functioning in port ${PORT}`);
});

// body parser
index.use(bodyParser.urlencoded({ extended: false }));

// handle bars
index.set('views', path.join(__dirname, 'views'));
index.engine('handlebars', exphbs({defaultLayout: 'main'}));
index.set('view engine', 'handlebars');

// static folder
index.use(express.static(path.join(__dirname, 'public')));

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Conected to the database");
  })
  .catch(err => {
    console.log("Error to conect", err);
  });

// routes
index.get('/', (req, res) => {

  let search = req.query.job;
  let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if(!search) {
    Game.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(games => {
  
      res.render('index', {
        games
      });
  
    })
    .catch(err => console.log(err));
  } else {
    Game.findAll({
      where: {title: {[Op.like]: query}},
      order: [
        ['createdAt', 'DESC']
    ]})
    .then(games => {
      console.log(search);
      console.log(search);
  
      res.render('index', {
        games, search
      });
  
    })
    .catch(err => console.log(err));
  }

  
});

// DELETE game by ID
index.delete('/games/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Game.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: `Game with ID ${id} was deleted.` });
    } else {
      res.status(404).json({ message: `Game with ID ${id} not found.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// games routes
index.use('/games', require('./routes/games'));