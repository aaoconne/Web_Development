/* import the express module and instantiate it into a variable. Setup a port number. */
const express = require('express');     // import module: express
const path = require('path');           // import module: path
const bodyParser = require('body-parser');     // import module: body parser
const port = process.env.PORT || 3000;         // initialize data for port 
const routes = require('./routes/game.routes');       // export router as module 
//app.use('/api/game', routes)        // app use routes on path: /api/game 

/* express app uses body parser to read Request object's JSON data & URL encoded data from route */ 
const app = express();          // express fxn to create app
app.use(bodyParser.json());         // use body parser to read json
app.use(bodyParser.urlencoded({extended:false})) // use body parser to read url 
app.use(localhostHandler);
app.use('/api/game', routes)        // app use routes on path: /api/game 

function localhostHandler(request, response, next){
    response.header('Access-Control-Allow-Origin', '*');
    next();
}

/* express app listens to port for requests; print image to console to show server launched properly */ 
app.listen(port);       // app listen on port
console.log(`Server is running on port ${port}...`);      // print message to console