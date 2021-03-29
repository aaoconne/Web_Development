const presidents = document.querySelectorAll('.presi');
const scoreBoard = document.querySelector('.score');
const aiming = document.querySelectorAll('.aim');
let lastPresi;
let timeUp = false;
let score = 0; 

/* function that will make a random time for the president to come from the hole */ 
function randomTime(min, max){
    return Math.round(Math.random() * (max-min)+ min);
}

/* function that randomize what holes the  come from */
/* doesnt allow for president to get the same number */ 
function randomPresi(presidents){
    const index = Math.floor(Math.random() * presidents.length);
    const presi = presidents[index];

    if(presi === lastPresi){
        return randomPresi(presidents);
    }
    lastPresi = presi;
    return presi;
}

/* function that will set the time of how long presi should peek from hole */
/* function also sets the time of when presi should 'peek down' after some random time */
function peek(){
    const time = randomTime(1000,1000); // random time for presi to peek from hole 
    const presi = randomPresi(presidents); //get the random president from the randomPresi function
    presi.classList.add('up'); // addition of CSS class so selected president can 'pop up'
    setTimeout(() => {
        presi.classList.remove('up'); // have the president go into the hole after some random time 
        if(!timeUp){
            peek();
        }
    }, time)
}

/* function to start the game */
function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peek();
    setTimeout(() => timeUp = true, 10000) // if user stops whacking for 10 seconds or longer, stop having trump pop from hole 

/* function that will take the object whack and pass it to the event handlers */
function whack(e){
    if(!e.isTrusted) return; 
    score++; //increment score everytime user successfully whacks a president 
    this.parentNode.classList.remove('up'); 
    scoreBoard.textContent = score;
}

aiming.forEach(aim => aim.addEventListener('click', whack))}