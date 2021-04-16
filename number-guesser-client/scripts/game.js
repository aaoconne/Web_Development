window.onload = mainMenu;

/* method to send a request for a new game to the backend API, then display the game view to console */ 
async function startGame(){
    min = getMin();
    max = getMax();
    const url = `http://localhost:3000/api/game/new?start=${min}&end=${max}`;
    const response = await fetch(url);
    const data = await response.json();
    gameID = data.gameID;
    viewGame();
}

/* request backend to get game data;
if successful then set app data and display, otherwise return to menu */ 
async function findGame(){
    gameID = getGameID();
    const response = await fetch(`http://localhost:3000/api/game/${gameID}`);
    const data = await response.json();
    if(data.success){
        min = data.start;
        max = data.end;
        gameover = data.gameover;
        viewGame();
    }
    else{
        mainMenu();
    }
}

/* request backend to submit a guess;
if successfull then either display a clue or show game over message */ 
async function submitGuess(){
    const guess = getGuess();
    const url = `http://localhost:3000/api/game/${gameID}/guess?guess=${guess}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.success){
        switch(data.guess){
            case "correct": gameOverMenu("You win!"); break;
            case "gameover": gameOverMenu("You lose!"); break;
            default: viewClue(data.guess, guess)
        }
    }
}

/* requests to backend to reset game and then update game view */ 
async function resetGame(){
    const url = `http://localhost:3000/api/game/${gameID}/reset`;
    const response = await fetch(url);
    await response.json().then(viewGame);
}