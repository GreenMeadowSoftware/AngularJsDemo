var app = angular.module('HangmanApp', [ /* No Dependencies */ ]);
app.controller('GameController',
    function($scope)
    {
        var words = [ 'cobweb', 'plastic', 'magic', 'jacket', 'machine', 'meal', 'newspaper', 'dress', 'monkey', 'potato' ];

        $scope.incorrectLetters = [];
        $scope.correctLetters = [];
        $scope.maxTries = 10;
        $scope.displayWord = '';
        $scope.winner = null;
        $scope.input =
        {
            letter: ''
        };

        var selectRandomWord = function()
        {
            var i = parseInt(Math.random() * words.length);
            return words[i];
        }

        $scope.newGame = function()
        {
            // reset variables
            $scope.incorrectLetters = [];
            $scope.correctLetters = [];
            $scope.displayWord = '';
            $scope.winner = null;

            // select our word
            $scope.selectedWord = selectRandomWord();

            // set the display word
            for (var i in $scope.selectedWord)
            {
                $scope.displayWord += ' _';
            }

            //DEBUG
            console.log($scope.selectedWord);

        }

        $scope.guessLetter = function()
        {

            // win/game over scenario
            if ($scope.winner != null)
            {
                return;
            }

            // accept only letters
            if (!$scope.input.letter.match(/^[a-z]$/i))
            {
                console.log('Invalid input', $scope.input.letter);
                $scope.input.letter = '';
                return;
            }

            // convert to lowercase for easy comparisson
            $scope.input.letter = $scope.input.letter.toLowerCase();

            // check to see if the letter has already been guessed
            var guessedLetters = $scope.incorrectLetters.concat($scope.correctLetters);            
            for (var i in guessedLetters)
            {
                if (guessedLetters[i].toLowerCase() == $scope.input.letter)
                {
                    $scope.input.letter = '';
                    return;
                }
            }

            //DEBUG
            console.log($scope.input.letter);

            // check to see if the letter is in our selected word
            var correct = false;
            for (var i in $scope.selectedWord)
            {
                if ($scope.selectedWord[i] == $scope.input.letter)
                {
                    correct = true;
                    break;
                }
            }

            if (correct)
            {
                $scope.correctLetters.push($scope.input.letter);

                // update the display word
                $scope.displayWord = '';
                var winner = true;
                for (var i in $scope.selectedWord)
                {
                    if ($scope.correctLetters.includes($scope.selectedWord[i]))
                    {
                        $scope.displayWord += ' ' + $scope.selectedWord[i];
                    }
                    else
                    {
                        $scope.displayWord += ' _';
                        winner = false;
                    }
                }

                // check for win condition
                if (winner)
                {
                    $scope.winner = true;
                }

            }
            else
            {
                $scope.incorrectLetters.push($scope.input.letter);

                // check for game over
                if ($scope.incorrectLetters.length == $scope.maxTries)
                {
                    $scope.displayWord = $scope.selectedWord;
                    $scope.winner = false;
                }

            }

            // reset ready for the next guess
            $scope.input.letter = '';

        }

        $scope.newGame();

    }
);