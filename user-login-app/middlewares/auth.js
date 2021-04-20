/* middleware function that checks if user is authenticated, if so continue, otherwise redirect to login */ 
exports.checkAuthenticated = function(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect('/login')
}

/* middleware function that checks if user is authenticated, if so, redirect to home,
otherwise continue */ 
exports.checkNotAuthenticated = function(request, response, next){
    if(request.isAuthenticated()){
        return response.redirext('/');
    }
    next();
}