var inquirer = require("inquirer");
var Word = require("./Word.js");
var axios = require("axios");

var wins = 0;
var losses = 0;

function startHangman() {

    //var wordBank = ["red", "yellow", "blue"];

    //var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    axios.get("https://api.datamuse.com/words?ml=music&max=40")

    .then(function (response) {

        var musicWord = response.data;

        var rndMusicWord = musicWord[(Math.floor(Math.random() * musicWord.length))];

        randomWord = rndMusicWord.word;
        
        gotIt = false;

        guesses = [];

        noOfGuesses = 10;

        isGameOver = false;

        console.clear();
        console.clear();
        console.log("\n\n\n\n\n\n\n");
        console.log("#    #   ##   #    #  ####  #    #   ##   #    #");
        console.log("#    #  #  #  ##   # #    # ##  ##  #  #  ##   #");
        console.log("###### #    # # #  # #      # ## # #    # # #  #");
        console.log("#    # ###### #  # # #  ### #    # ###### #  # #");
        console.log("#    # #    # #   ## #    # #    # #    # #   ##");
        console.log("#    # #    # #    #  ####  #    # #    # #    #");
        console.log("\n");
        console.log("\nYou will have " + noOfGuesses + " turns to guess the answer.");
        console.log("\nGuessing a correct letter will not count against your attempts");

        currentWord = new Word(randomWord);

        currentWord.empties();

        console.log("\n" + currentWord.create() + "\n");

        promptUser();

    }) // end axios
}

function promptUser() {

    currentWord.answerFound();

    if(noOfGuesses < 1 || gotIt) {

        isGameOver = true;

        playAgain();

    } else {

        inquirer.prompt([

            {
                name    : "guess",
                message :   "Choose your letter..."
            }
        ])

        .then(function(answers) {

            if(guesses.find(function(item) {

                return item === answers.guess.toUpperCase();
            })) 

            {
                console.log("\nYou have already guessed that letter - try again...\n");

                promptUser();

            } else {

                guesses.push(answers.guess.toUpperCase());

                console.log("\nLetters You Have Guessed So Far: " + guesses);

                letFound = currentWord.compare(answers.guess);
                
                console.log("\nRemaining Turns: " + noOfGuesses);

                console.log("\n" + currentWord.create() + "\n");

                console.log("Your current score is " + wins + " wins, and " + losses + " losses\n");

                promptUser();

            }
        })
    }
}

function playAgain() {

    if(isGameOver) {

        if(noOfGuesses < 1) {

            console.clear();
            console.clear();
            console.log("\n\n\n\n\n\n\n");
            losses++;

            
            console.log("\n");
            
            console.log("Your final score is " + wins + " wins, and " + losses + " losses\n");
            console.log("\n");

            console.log(" ####    ##   #    # ######     ####  #    # ###### #####");
            console.log("#    #  #  #  ##  ## #         #    # #    # #      #    #");
            console.log("#      #    # # ## # #####     #    # #    # #####  #    #");
            console.log("#  ### ###### #    # #         #    # #    # #      #####");
            console.log("#    # #    # #    # #         #    #  #  #  #      #   #");
            console.log(" ####  #    # #    # ######     ####    ##   ###### #    #");
            console.log("\n");
            console.log("\n");

        } else {

            console.clear();
            console.log("\n\n\n\n\n\n\n");

            wins++;

            console.log("                                           iiii                                                                              !!!");
            console.log("                                          i::::i                                                                            !!:!!");
            console.log("                                           iiii                                                                             !:::!");
            console.log("                                                                                                                            !:::!");
            console.log("wwwwwww           wwwww           wwwwwwwiiiiiiinnnn  nnnnnnnn    nnnn  nnnnnnnn        eeeeeeeeeeee    rrrrr   rrrrrrrrr   !:::!");
            console.log(" w:::::w         w:::::w         w:::::w i:::::in::: nn::::::::nn n:::nn::::::::nn    ee::::::::::::ee  r::::rrr:::::::::r  !:::!");
            console.log("  w:::::w       w:::::::w       w:::::w   i::::in::::::::::::::nn n::::::::::::::nn  e::::::eeeee:::::eer:::::::::::::::::r !:::!");
            console.log("   w:::::w     w:::::::::w     w:::::w    i::::inn:::::::::::::::nnn:::::::::::::::ne::::::e     e:::::err::::::rrrrr::::::r!:::!");
            console.log("    w:::::w   w::::: w:::::w  w:::::w     i::::i  n:::::nnnn:::::n  n:::::nnnn:::::ne:::::::eeeee::::::e r:::::r     r:::::r!:::!");
            console.log("     w:::::w w:::::w w:::::w w:::::w      i::::i  n::::n    n::::n  n::::n    n::::ne:::::::::::::::::e  r:::::r     rrrrrrr!:::!");
            console.log("      w:::::w:::::w   w:::::w:::::w       i::::i  n::::n    n::::n  n::::n    n::::ne::::::eeeeeeeeeee   r:::::r            !!:!!");
            console.log("       w:::::::::w     w:::::::::w        i::::i  n::::n    n::::n  n::::n    n::::ne:::::::e            r:::::r             !!!");
            console.log("        w:::::::w       w:::::::w        i::::::i n::::n    n::::n  n::::n    n::::ne::::::::e           r:::::r");
            console.log("         w:::::w         w:::::w         i::::::i n::::n    n::::n  n::::n    n::::n e::::::::eeeeeeee   r:::::r             !!!");
            console.log("          w:::w           w:::w          i::::::i n::::n    n::::n  n::::n    n::::n  ee:::::::::::::e   r:::::r            !!:!!");
            console.log("           www             www           iiiiiiii nnnnnn    nnnnnn  nnnnnn    nnnnnn    eeeeeeeeeeeeee   rrrrrrr             !!!");


            console.log("\nYou Win!\n");
            console.log("\n");
            console.log("Your final score is " + wins + " wins, and " + losses + " losses\n");
            console.log("\n");

        }

        inquirer.prompt([
            {
                type  :  "confirm",
                name  :  "again",
                message  :  "Would you like to play again?"
            }
        ])
        .then(function(restart) {

            if(restart.again) {

                console.log("Ok");

                startHangman();

            } else {

                console.log("\nAlright, see you later!\n");
            }
        })
    }
}

startHangman();

    