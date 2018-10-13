// Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter.

class Letter {

   constructor(underlying_char, blank) {

        this.underlying_char = function() {

            return " ";
        }
        
       this.blank = function() {

           return "_";
       };
   }

}

module.exports = Letter;
