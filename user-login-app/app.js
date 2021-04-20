/* if not in production, then import the 'dotenv' module & configure it into the runtime process env. */ 
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

/* barebones express app that listens on a port */
const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user-routes');
const bodyParser = require('body-parser')   // import body-parser (middleware) to access data in the request's body
const session = require('express-session');
const passport = require('./middlewares/passport-config');  // imprt the passport-config module into the app 
const flash = require('express-flash');    // import the express-flash module into the app 

function setupApp(){
    app.set('view-engine', 'ejs');
    app.use(bodyParser.urlencoded({extended:false}));  // refactor setupApp function so the express app initializes & uses the bodyParser module
    const sessionConfig = {secret:process.env.SESSION, resave:false, saveUninitialized:true}; // sessions require a secret string for hashing; set saveUnitinialized to true
    app.use(session(sessionConfig)); // session IDs remain the same for requests from the same client 
    app.use(flash()); // have the app use the flash middleware
    app.use(passport.initialize());  // initialized instance of passport 
    app.use(passport.session());   // append authentications into the session header of the request/response
    app.use('/', userRoutes);   
}

setupApp(); 
app.listen(port, () => console.log(`listening on... ${port}`));
