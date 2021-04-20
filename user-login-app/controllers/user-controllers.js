/* import the users model into the users-controllers module */ 
const users = require('../models/users-model');
const passport = require('../middlewares/passport-config');

/* user controllers that manages the functions from client requests to resolve into a server response */ 
class UserControllers{
    getIndex(request, response){
        console.log(request.session.id);    // display the session id from the request object
        response.render('index.ejs', {name: request.user.name});
    }

    /* getLogin function that renders the login page */ 
    getLogin(request, response){
        console.log(request.session.id);    // display the session id from the request object 
        response.render('login.ejs');
    }

    /* getRegister function that renders the register page */ 
    getRegister(request, response){
        console.log(request.session.id);    // display the session id from the request object 
        response.render('register.ejs');
    }

    /* postLogin();
    invoke passport's authenticateUser function as middleware to manage authenticating logins */ 
    postLogin(request, response, next){
        const config = {};
        config.successRedirect = '/';
        config.failureRedirect = '/login';
        config.failureFlash = true;     // have passport use express-flash on failure message
        const authHandler = passport.authenticate('local', config);
        authHandler(request, response, next);
    }

    /* postRegister();
    destructure data from the request body & show to the console;
    then send a response of 'success' to the client */ 
    postRegister(request, response){
        try{
            const {name, email, password} = request.body;
            users.add(name, email, password);
            response.redirect('/login');
        }
        catch{
            response.redirect('/register');
        }
    }

    /* postLogout() to UserControllers class that invokes logout function in Request object */ 
    postLogout(request, response){
        request.logOut();
        response.redirect('login');
    }
}

module.exports = new UserControllers();
