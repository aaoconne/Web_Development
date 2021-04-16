/* An express router and add a /'test' route for GET method that triggers the controller's test callback function. 
Import your controllers methods into this script to use as the callbacks.
Export the router as a module so that other Javascript files may import it. */ 
var express = require('express');       // import module: express 
var router = express.Router();      // initialize router 
const {resetGame, guess, getGame, newGame, test} = require('../controllers/game.controllers'); // import test function 

router.get('/test', test);      // endpoint for test()
router.get('/new', newGame);
router.get('/:id', getGame);        // define variable route with colon 
router.get('/:id/guess', guess);       
router.get('/:id/reset', resetGame);

module.exports = router;        // export router as module 