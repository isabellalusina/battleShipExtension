var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;

    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");

    }
};
var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
        { locations: ["24", "34", "44"], hits: ["", "", ""] },
        { locations: ["10", "11", "12"], hits: ["", "", ""] }
    ],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("TRAFIONY!");
                if (this.isSunk(ship)) {
                    view.displayMessage("Zatopiłeś mój okręt!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("Spudłowałeś.");
        return false;
    },
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
            return true;
        }

    }
};

var controller = {
    guesses: 0,

    praseGuess: function(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

        if (guess === null || guess.length !== 2) {
            alert("Ups, proszę wpisać literę i cyfrę.");
        } else {
            firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);
            if (isNaN(row) || isNaN(column)) {
                alert("Ups, to nie są współrzędne!");
            } else if (row < 0 || row >= model.boardSize ||
                column < 0 || column >= model.boardSize) {
                alert("Ups, pole poza planszą!");
            } else {
                return row + column;
            }
        }
        return null;

    }
    
};