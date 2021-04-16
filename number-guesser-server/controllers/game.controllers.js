/* Controller class that has a test method. 
The test method sends JSON data as a response. 
Export an instance of Controller as a module so that other JavaScript files may import it */ 
const game = require('../models/game.model');       // import module: game


class Controllers{
    test(request, response){ 
        response.json({'success': true});   // send JSON data 
    }

    /* add a newGame() to the controllers class. 
    this method passes params to the game create method.
    it sends back the game id as JSON data */ 
    newGame(request, response){
        const {start, end} = request.query;      // destructure min, max from Query 
        const id = game.create(start, end);     // invoke game's create method 
        response.json({'success': true, 'gameID': id});      // send JSON data 
    }

    /* getGame() passes params to the game's get().
    it sends back the game data as JSON data.
    if the game returns null, then send sucess: false response */ 
    getGame(request, response){
        const id = request.params.id;       // get id from request parameters 
        const data = game.get(id);      // invoke games get()
        if(data){           // if data exists 
            data["success"] = true;     // add 'success' to data 
            response.json(data);        // send as JSON data 
        }
        else{       // if data does not exist 
            response.json({"success": false})       // send JSON data with no success
        }
    }

    /* guess() passes params to the games guess method.
    it sends back the result as JSON data. 
    if the game returns null, then send a sucess: false response */ 
    guess(request, response){
        const id = request.params.id;       // get id from request params 
        const {guess} = request.query;      // destructure guess from query string 
        const result = game.guess(id, guess);       // invoke games guess method
        if(result){     // if result exists 
            result['success'] = true;   // add success to it 
            response.json(result);      // send as JSON data 
        }
        else{
            response.json({'success': false})   // send 'no success' as JSON data
        }
    }

    /* reset() passes params to the games reset method.
    it sends back the result as JSON data.
    if the game returns null, then send a success: false response */ 
    resetGame(request, response){
        const id = request.params.id;   // get game id from response parameters 
        const result = game.reset(id);      // invoke games reset method 
        if(result){     // if result exists 
            result['success'] = true;       // set result with a success: true 
            response.json(result)           // send data as JSON 
        }
        else{       // if result does not exist 
            response.json({'success':false});   // send no success as JSON
        }
    }
}

module.exports = new Controllers();     // export Controller instance as module