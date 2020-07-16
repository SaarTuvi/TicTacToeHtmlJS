const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var nextAction = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    return roundWon;
}

function resetVariables(){
    gameState = ["", "", "", "", "", "", "", "", ""];
    nextAction = "X";
    color = "blue";
}

function createTicTacToeTable() {
    resetVariables()
    var x = document.getElementById("ticTacToe")
    var rowsLength = x.rows.length;
    for (let index = 0; index < rowsLength; index++) {
        x.deleteRow(0);
    }
    x.border = 3;
    var btnId = 0;
    for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
        var row = x.insertRow(rowNumber);
        row.id = "Row_" + rowNumber;
        row.style.height = '100px'
        row.style.backgroundColor = "lightskyblue";
        for (let cellNumber = 0; cellNumber < 3; cellNumber++) {
            var cell = row.insertCell(cellNumber)
            cell.id = "Cell_" + rowNumber + "_" + cellNumber;
            cell.style.width = '100px';
            cell.style.fontSize = "50px";
            var btn = document.createElement('input');
            btn.type = "button";
            btn.name = "tableBtn";
            btn.id = btnId
            btn.value = nextAction;
            btn.style.width = '75px';
            btn.style.height = '75px';
            btn.style.borderRadius = "75%";
            btn.style.fontSize="40px";
            btn.onclick = (function () { onBtnClicked(this) });
            cell.appendChild(btn);
            btnId++;
        }
    }
}

function onBtnClicked(btnClicked) {
    //      window.alert(btnClicked.id+" Pressed");
    thisCell = btnClicked.closest("td");
    thisCell.removeChild(btnClicked);
    thisCell.style.color = color;
   
    thisCell.innerHTML = nextAction;
    var isWon = updateGameState(btnClicked.id);
    if(!isWon){
        if (nextAction == 'X'){
            nextAction = 'O';
            color = "red";
        }
        else{
            nextAction = 'X';
            color = "blue";
        }
        var allBtns = document.getElementsByName('tableBtn');
        allBtns.forEach(element => { element.value = nextAction; });
    }
    else{
        window.alert("Game over! "+nextAction+" Won!")
        createTicTacToeTable();
    }
}

function updateGameState(btnId) {
    gameState[parseInt(btnId)] = nextAction;
   return handleResultValidation();
}