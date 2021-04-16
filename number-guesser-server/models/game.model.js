/* Game class that manages all game data.
Game model registers games with an id & adds a hashmap.
Module shortid is used to generate game IDs. 
Create() adds a new game to hashmap & requires two parameters(min, max) */
const shortid = require('shortid');         // import module: shortid 

class Game{
    constructor(){
        this.games = {};        // instance var: hashmap 
    }                           // holds all game data 

    create(start, end){         
        const number = ~~(Math.random() * end + start)  // generate random int 
        const id = shortid.generate();      // generate random id
        let game={'number':number,'start':start,'end':end,'gameover':false};    // add to hashmap with id 
        this.games[id] = game;      
        console.log(this.games);
        return id; 
    }

    /* implementation of a 'get()' that takes in an id param.
    check id has data & destructure it to remove the secret number then return data.
    if id isnt in the hashmap then return null */ 
    get(id){
        if(this.games[id]){
            const{number, ...data} = this.games[id];
            return data;
        }
        else{
            return null; 
        }
    }

    /* guess().
    check whether the game is over, or whether the guess is correct, too low, 
    or too high; otherwise its an error. */
    guess(id, guess){
        if(!this.games[id]){        // if id has no data 
            return null;            // return null 
        }
        const game = this.games[id];        // get game data from hashmap
         if(game.gameover == true){         // if game is over 
             return {'guess': 'gameover'}       // then its game over 
         }
         else if(game.number == guess){ //if guess is number 
            game.gameover = true;       // then set game as over 
            return {'guess': 'correct'}     // then its correct 
         }
         else if(game.number > +guess){     // if number is greater than guess 
            return {'guess': 'too low'}     // then its too low 
         }
         else if(game.number < +guess){     // if number is less than guess
             return {'guess': 'too high'}   // then number is too high 
         }
         else{
             return {'guess': 'error'}
         }
    }

    /* if the game exists & its over, then reandomize the number & toggle the game over variable 
    Return data without number, or null if game is not over or does not exist */ 
    reset(id){
        if(this.games[id] && this.games[id].gameover){      // check game exists & it over 
            const game = this.games[id];        // get game from hashmap 
            game.number = ~~(Math.random() * game.end + game.start)        // set new random int 
            game.gameover = false;      // set gameover to false 
            const {number, ...data} = game;     // destructure to remove number 
            return data;        // return data, without number 
        }
        return null;        // game doesnt exist or not over, return nothing 
    }
}
module.exports = new Game();        // export Game instance as module 