var count = 0;
var gameWon = false;
var seconds = 0;
var timer;
var timeStarted = false;

function startTimer() {
    if (!timeStarted) {
        timeStarted = true;
        timer = setInterval(function() {
            seconds++;
            document.getElementById("timer").textContent = seconds;
        }, 1000)
    }
}

function simpleGame() {
    for (var row = 1; row <= 4; row++) {
        for (var col = 1; col <= 4; col++) {
            var cell = document.getElementById("cell" + row + col);
            var expectedTile = (row - 1) * 4 + col;

            cell.className = "tile" + expectedTile;
        }
    }

    swapTitles("cell34", "cell44");

    count = 0;
    updateCount();
    clearInterval(timer);
    seconds = 0;
    timerStarted = false;
    document.getElementById("timer").textContent = seconds;
    gameWon = false;
}

function updateCount() {
    document.getElementById("count").textContent = count;
}

function swapTitles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

function checkWin() {
    if (gameWon == true) {
        return;
    }
    var curTile = 1;
    for (var row = 1; row <= 4; row++) {
        for (var col = 1; col <=4; col++) {
            var cell = document.getElementById("cell"+row+col);
            if (cell.className != ("tile"+curTile)) {
                return;
            }
            curTile++;
        }
    }
    gameWon = true;
    clearInterval(timer);
    alert("Congratulations! You solved the puzzle in " + count + " moves and " + seconds + " seconds! Click 'OK' to shuffle.");
    shuffle();
}

function shuffle() {
    //Nested for loop for 4x4 grid
    for(var row = 1; row <= 4; row++) {
    
        for (var col = 1; col <= 4; col++) {
            var row2 = Math.floor(Math.random() * 4 + 1);
            var col2 = Math.floor(Math.random() * 4 + 1);

            swapTitles("cell"+row+col, "cell"+row2+col2);
        }
    }
    clearInterval(timer);
    seconds = 0;
    timeStarted = false;
    document.getElementById("timer").textContent = seconds;
    count = 0;
    updateCount();
    gameWon = false;
}

function clickTile(row, col) {
    var cell = document.getElementById("cell"+row+col);
    var tile = cell.className;

    if(tile != "tile16") { 
        //Check if white tile is on the right
        if (col < 4) {
            if(document.getElementById("cell"+row+(col+1)).className=="tile16") {
                swapTitles("cell"+row+col, "cell"+row+(col+1));
                startTimer();
                count++;
                updateCount();
                setTimeout(() => {checkWin()}, 1000);
                return;
            }
        }
        //Check if white tile is on the left
        if (col > 1) {
            if(document.getElementById("cell"+row+(col-1)).className=="tile16") {
                swapTitles("cell"+row+col, "cell"+row+(col-1));
                startTimer();
                count++;
                updateCount();
                setTimeout(() => {checkWin()}, 1000);
                return;
            }
        }
        //Check if white tile is above
        if (row > 1) {
            if(document.getElementById("cell"+(row-1)+col).className=="tile16") {
                swapTitles("cell"+row+col, "cell"+(row-1)+col);
                startTimer();
                count++;
                updateCount();
                setTimeout(() => {checkWin()}, 1000);
                return;
            }
        }
        //Check if white tile is bellow
        if (row < 4) {
           if(document.getElementById("cell"+(row+1)+col).className=="tile16") {
                swapTitles("cell"+row+col, "cell"+(row+1)+col);
                startTimer();
                count++;
                updateCount();
                setTimeout(() => {checkWin()}, 1000);
                return;
            } 
        }
    }
}
