/* module that configures passport with a local strategy for authenticating a user;
passport needs a function that handles authenticateUser & needs the names for usernmaes & password from our forms */ 
const {Strategy} = require('passport-local');
const passport = require('passport');
const users = require('../models/users-model');
const bcrypt = require('bcrypt');

/* authenticateUser will pass the done() two params;
first param is for an error and should be null;
second param is for data, so pass user data if it exists & false if it doesnt;
this data is set into the Request object */ 
async function authenticateUser(email, password, done){
    const user = users.findUser('email', email);
    if(user === undefined){
        return done(null, false, {message: 'No user with that email'});       // error, user, msg
    }
    if(await bcrypt.compare(password, user.password)){  // compare submission to the hash
        return done(null, user);        // error, user
    }
    else{
        return done(null, false, {message: 'Password incorrect'});       // error, user, msg
    }
}

function setupPassport(){
    const formNames = {usernameField:'email', passwordField:'password'};
    const localStrategy = new Strategy(formNames, authenticateUser);
    passport.use(localStrategy);
    passport.serializeUser((user, done) => done(null, user.id));    // serialize the user with the id 
    passport.deserializeUser((id,done) => done(null, users.findUser('id', id)));    // to deserialize the user, invoke the findUser() from users using the id 
}

setupPassport();
module.exports = passport; 