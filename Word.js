//Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess.

var Letter = require("./Letter.js");


class Word {

    constructor(answer, playerChoice) {

        this.answer = answer;

        this.answerSplit = answer.split("");

        this.playerChoice = playerChoice;

        this.letterArr = [];
        
    }

    empties() {

        for(var i = 0; i < this.answer.length; i++) {

            var newLetter = new Letter(this.answer[i]);

            if(this.answer[i].valueOf() !== " ") {

                this.letterArr.push(newLetter.blank());

            } else {

                this.letterArr.push(newLetter.underlying_char());
            }
        }

    } // end empties method

    compare(letterGuessed) {
        
        var upperCase = letterGuessed.toUpperCase();

        var lowerCase = letterGuessed.toLowerCase();

        for (var i = 0; i < this.letterArr.length; i++) {

            if(this.answer[i].valueOf() === upperCase || this.answer[i].valueOf() === lowerCase) {              

                this.letterArr[i] = this.answer[i].valueOf();

            }
        }

        var j = (this.answer.indexOf(lowerCase));
        
        if (j === -1) {

            noOfGuesses--;
        }

    } // end compare method

    answerFound() {
        
        if(this.letterArr.join("") === this.answer) {

            gotIt = true;

        } else {

        }

    } // end answerFound method

    create() {
    
        return this.letterArr.join(" ");
        
    } // end create method
}

module.exports = Word;