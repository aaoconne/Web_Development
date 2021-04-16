/* function that maps callbacks to button IDs */ 
const getCallbacks = function(){
    const callbacks = {};
    callbacks['new-game-button'] = newGameMenu;
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