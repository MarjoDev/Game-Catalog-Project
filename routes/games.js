const express = require('express');
const router  = express.Router();
const Game     = require('../models/Game');

// test route
router.get('/test', (req, res) => {
  res.send('functioning');
});

// game detail -> view/1, view/2   
router.get('/view/:id', (req, res) => Game.findOne({
  where: {id: req.params.id}
}).then(game => {

  res.render('view', {
    game
  });

}).catch(err => console.log(err)));


// form of the route to send
router.get('/add', (req, res) => {
  res.render('add');
})

// add game via post
router.post('/add', (req, res) => {

  let {title, price, company, description, publisher, new_game} = req.body;

  // insert
  Game.create({
    title,
    description,
    price,
    company,
    publisher,
    new_game
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err));

});

module.exports = router