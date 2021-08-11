/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Most of the Game logic is in the Game class.

// Game Class that has a constructor that initializes a missed property set to 0, a phrases property set to an array of 5 phrase objects, and an active phrase property set to null.
class Game {
    constructor(){
        this.missed = 0;
        this.correct = 0;
        this.totalLetters = 0;
        this.phrases = [
            "icecream is good",
            "become the program",
            "edge is terrible",
            "firefox rulez",
            "plz update safari"
        ];
        this.activePhrase = null;
    }

    // Start Game method that hides the start overlay when start button is clicked and sets the active phrase to a random phrase in the phrases array.
    startGame = () => {
        document.getElementById("overlay").style.display = "none";
        this.activePhrase = new Phrase( this.getrandomPhrase() );
        // call the addPhraseToDisplay method to add the active phrase to the display.
        this.activePhrase.addPhraseToDisplay();
        // total number of letters possible to guess correct
        this.totalLetters = document.getElementsByClassName("letter").length; 
    }

    // randomly returns a phrase from the phrases array.
    getrandomPhrase = () => {
        let p = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return p
    }

    // Main Game logic
    // calls checkLetter on the active phrase object and passes clicked letter as parameter.
    handleInteraction = (el) => {
        // check if letter is in the active phrase.
        if( this.activePhrase.checkLetter(el.textContent) ){
            // disable the button and add the chosen css class
            el.disabled = true;
            el.classList.add("chosen");
            // if letter is in the active phrase call show matched letter
            this.activePhrase.showMatchedLetter(el.textContent);
            this.checkForWin();
        }
        // if the letter is not in the active phrase call removeLife and disable the button
        else {
            // disabled the button and add the wrong css class
            el.disabled = true;
            el.classList.add("wrong");
            // remove a life
            this.removeLife();
            // if the player has no lives left, call the gameOver method
            if(this.missed === 5){
            this.gameOver(false);
            }
        }
    }

    // shows the matched letter
    showMatchedLetter = (l) => {
        // loop through the letters on the display and and reveal matching letters
        let letters = document.querySelectorAll(".letter");
        letters.forEach( (letter) => {
            // reveal any matching letters in the display and disable the button
            if(letter.innerHTML.toLowerCase() == l.toLowerCase()){
                this.activePhrase.showMatchedLetter(letter);
                this.correct++;
            }
        });
        
    }

    // removes a life from the player
    removeLife = () => {
        // replace a live heart image with lost heart image 
        const heartContainer = document.querySelector('img[src="images/liveHeart.png"]');
        heartContainer.src = "images/lostheart.png";
        // add 1 to the missed property
        this.missed++;
    }

    // checks if the player has won
    checkForWin = () => {
        // if this.correct is equal to the length of the active phrase, the player has won
        if(this.correct === this.totalLetters){
            this.gameOver(true);
        }
    }

    // reset the DOM at the end of the game
    resetDOM = () => {
        // reset the display
        document.querySelector("#phrase_letters").innerHTML = "";
        // reset each button on the onscreen keyboard
        document.querySelectorAll('div[class="keyrow"] > button').forEach( (button) => {
            button.disabled = false;
            button.classList.remove("chosen");
            button.classList.remove("wrong");
        });
        // reset the hear container to the original heart image
        const heartContainer = document.querySelectorAll('img[src="images/lostheart.png"]');
        heartContainer.forEach( (el) => {
            el.src = "images/liveHeart.png";
        });
        
    }

    // Display the final win or lose message by showing the overlay with a message and either the win or lose css class
    gameOver = (win) => {
        let overlay = document.getElementById("overlay").style.display = "flex";
        //  hide the h2 element on the overlay
        document.querySelector(".title").style.display = "none";
        const message = document.querySelector("#game-over-message")
        // player loses
        if(!win){
        // change the gameover text to lose message
        message.innerHTML = "You Lost!";
        document.getElementById('overlay').classList.add("lose");
        document.getElementById('overlay').classList.remove("win");
        // change the start button to a restart button
        document.getElementById("btn__reset").innerHTML = "Restart";
        }
        // players wins
        else{
            // change the gameover text to win message
            message.innerHTML = "You Won!";
            document.getElementById('overlay').classList.remove("lose");
            document.getElementById('overlay').classList.add("win");
            // change the start button to a restart button
            document.getElementById("btn__reset").innerHTML = "Play Again";
        }
        // Reset the DOM
        this.resetDOM();
    }
}