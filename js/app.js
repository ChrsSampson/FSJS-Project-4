/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Invoke objects and handle interactions

// initizalize the game variable
let game = ''

// Clicking on the start button should create a new game object and start the game
document.getElementById('btn__reset').onclick = () => {
     game = new Game();
    game.startGame();
}


// clicking on the onscreen keyboard should call handleInteraction method for the clicked button
// clicking the spaces between the buttons should do nothing
document.querySelector('#qwerty').onclick = (e) => {
    // make sure 'e' is a button element
    if (e.target.nodeName === 'BUTTON') {
        game.handleInteraction(e.target);
    }
}