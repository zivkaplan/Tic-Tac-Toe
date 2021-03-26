const h1 = document.querySelector("h1");
const board = document.querySelector("#board");
const cells = document.querySelectorAll("td");
const btn = document.querySelector("button");

let sign = "X";
let isPlaying = true;
let movesLeft = 9;
let draw = true;
let bo = ["", "", "", "", "", "", "", "", "", ""];

function showWinner(cellsList) {
    for (let cell of cells) {
        if (cellsList.includes(parseInt(cell.id))) {
            cell.style.color = "red";
        }
    }
}

function isWinner(sign) {
    const allPossibilities = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    let isWin = [];

    for (let possibility of allPossibilities) {
        const isWin = [];
        for (let i of possibility) {
            isWin.push(bo[i]);
        }
        if (isWin[0] == sign && isWin[1] == sign && isWin[2] == sign) {
            draw = false;
            showWinner(possibility);
            return true;
        }
    }
    return false;
};

function playerTurns() {
    sign = "X";
    if (movesLeft % 2 === 0) { sign = "O" };
    return sign;
}


function gameOver(sign) {
    isPlaying = false
    btn.classList.toggle('hidden');
    if (draw) {
        h1.innerText = "No More Moves!";
    } else {
        h1.innerText = `${sign} Wins!`;
    }
}

function restartGame() {
    h1.innerText = "Tic Tac Toe";
    bo = ["", "", "", "", "", "", "", "", "", ""];
    isPlaying = true;
    movesLeft = 9;
    draw = true;
    sign = "X"
}
btn.addEventListener("click", () => {
    restartGame();
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.color = "black";
    })
    btn.classList.toggle("hidden");
})


for (let cell of cells) {
    cell.addEventListener("mouseenter", (ev) => {
        if (!ev.target.innerText && isPlaying) {
            ev.target.innerText = sign;
            ev.target.classList.add("hover");
        }
    })
}
for (let cell of cells) {
    cell.addEventListener("mouseleave", (ev) => {
        if (ev.target.classList.contains("hover")) {
            ev.target.innerText = "";
            ev.target.classList.remove("hover");
        }
    })
}

board.addEventListener('click', (e) => {
    if (e.target.classList.contains("hover") && isPlaying) {
        e.target.classList.remove("hover");
        e.target.style.color = "black";
        e.target.innerText = sign;
        bo[parseInt(e.target.id)] = sign;
        movesLeft--;
        if (isWinner(sign) || movesLeft === 0) {
            gameOver(sign);
        }
        sign = playerTurns();
    }
})
