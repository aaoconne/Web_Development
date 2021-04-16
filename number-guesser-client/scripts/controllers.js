/* function that maps callbacks to button IDs */ 
const getCallbacks = function(){
    const callbacks = {};
    callbacks['new-game-button'] = newGameMenu;
    callbacks['start-game-button'] = startGame;
    callbacks['join-game-button'] = joinGameMenu;
    callbacks['find-game-button'] = findGame;
    callbacks['submit-guess-button'] = submitGuess;
    callbacks['reset-game-button'] = resetGame; 
    callbacks['quit-game-button'] = mainMenu;
    return callbacks;
}

/* function that takes in a variable number of button IDs & sets their event listeners */ 
const addController = function(...buttonIDs){
    const callbacks = getCallbacks();
    for(let id of buttonIDs){
        const button = document.getElementById(id);
        button.addEventListener('click', callbacks[id]);
    }
}

/* functions to get the min & max values from inputs */ 
const getMin = () => document.getElementById('min-value').value;
const getMax = () => document.getElementById('max-value').value;
/* function to get the existing game's id value from HTML input */ 
const getGameID = () => document.getElementById('room-code').value;
/* function to get the user's guess value from HTML input */ 
const getGuess = () => document.getElementById('guess-input').value;