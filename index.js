// Initialize variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Get all the boxes
const boxes = document.querySelectorAll('.box');


// Add click event listeners to each box
boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (gameActive && !gameBoard[box.id - 1]) {
            // Update the game board and display the X or O
            gameBoard[box.id - 1] = currentPlayer;
            box.innerHTML = `<p>${currentPlayer}</p>`;
            const pElement = box.querySelector('p');
            
            // Apply styles to the p element
            pElement.style.fontFamily = 'Fredoka One, cursive'; 
            pElement.style.fontSize = '50px'; 
            pElement.style.color = '#FAB201'; 
            
            // Check for a winner
            if (checkWinner()) {
                displayResult(`'${currentPlayer}' won the game!`);
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                // Check for a draw
                displayResult('It\'s a draw!');
                gameActive = false;
            } else {
                // Switch players
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});




// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Function to display the result
function displayResult(message) {
    const resultMessage = document.getElementById('message');
    resultMessage.innerHTML = message;
    const resultContainer = document.getElementById('result');
    resultContainer.style.visibility = 'visible';
}

// Play again button
const playAgainButton = document.getElementById('button');
playAgainButton.addEventListener('click', () => {
    // Reset variables and game board
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Hide result container
    const resultContainer = document.getElementById('result');
    resultContainer.style.visibility = 'hidden';

    // Clear the board
    boxes.forEach(box => {
        box.innerHTML = '';
    });
});

