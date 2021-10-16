// Phrase Class that has a constructor that recieves a phrase parameter
class Phrase{
    constructor(phrase){
        this.phrase = phrase;
    }
    
    //Add phrase to the game board
    addPhraseToDisplay = () => {
        // split the phrase into an array of letters and append them to the display as li elements
        let phraseArray = this.phrase.split("");
        const display = document.querySelector('#phrase_letters')
        phraseArray.forEach((letter, index) => {
            // create a li element and check if it is a letter or space
            let el = document.createElement('li');
            el.textContent = letter;
            if(letter != " "){
                el.classList.add('letter')
            }
            else{
                el.classList.add('space')
            }
            // append the element to the display
            display.appendChild(el);
        });
    }
    //check if a letter is in the phrase
    checkLetter = (letter) => {
        // split the phrase into an array of letters
        let phraseArray = this.phrase.split("");
        // check if the letter is in the phrase
        let isInPhrase = phraseArray.indexOf(letter) > -1;
        // return true or false
        return isInPhrase;
    } 

    // reveals the letter(s) on the board that match the players selection
    showMatchedLetter = (l) => {
        // select letter on the display
        const letters = document.getElementsByClassName('letter');
        // loop through the letters in the phrase and add css class show to the matching letters
        Array.from(letters).forEach((letter) => {
            if( letter.textContent.toLowerCase() == l.toLowerCase() ){
                letter.classList.add('show');
                game.correct++;
            }
        });
    }
}
