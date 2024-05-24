const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
const gamesPlayedDisplay = document.getElementById('games-played')
const userWinsDisplay = document.getElementById('user-wins')
const computerWinsDisplay = document.getElementById('computer-wins')
const drawsDisplay = document.getElementById('draws')
const historyDisplay = document.getElementById('history')

let userChoice
let computerChoice
let result
let gamesPlayed = 0
let userWins = 0
let computerWins = 0
let draws = 0
let history = []
let lastChoice=null;
let playerStreak = 0
let computerStreak = 0
let currentStreak = {player: 0, computer: 0};
let choicesCount = {player: {}, computer: {} };
let decisionTimes = [];
let startTime = Date.now();


possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    startTime = Date.now(); //reset startTime on each new choice made
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
    updateStatistics()
    trackPlayerChoice(userChoice, 'player')
    trackPlayerChoice(computerChoice, 'computer')
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1 


if (randomNumber === 1) {
    computerChoice = 'rock'
}

if (randomNumber === 2) {
    computerChoice = 'scissors'
}

if (randomNumber === 3) {
    computerChoice = 'paper'
}

computerChoiceDisplay.innerHTML = computerChoice

}

function getResult() {
    if (computerChoice === userChoice) {
        result = 'it\'s a draw!'
        draws++
    }
    if (computerChoice === 'rock' && userChoice === 'paper') {
        result = 'you win!'
        userWins++
    }
    if (computerChoice === 'rock' && userChoice === 'scissors') {
        result = 'you lose!'
        computerWins++
    }
    if (computerChoice === 'paper' && userChoice === 'rock') {
        result = 'you lose!'
        computerWins++
    }
    if (computerChoice === 'paper' && userChoice === 'scissors') {
        result = 'you win!'
        userWins++
    }
    if (computerChoice === 'scissors' && userChoice === 'rock') {
        result = 'you win!'
        userWins++
    }
    if (computerChoice === 'scissors' && userChoice === 'paper') {
        result = 'you lose!'
        computerWins++
    }
    history.push(`Game ${gamesPlayed + 1}: ${userChoice} vs ${computerChoice} - ${result}`)
    resultDisplay.innerHTML = result
}

function updateStatistics() {
    gamesPlayed++
    gamesPlayedDisplay.innerHTML = `Games Played; ${gamesPlayed}`
    userWinsDisplay.innerHTML = `User Wins: ${userWins}`
    computerWinsDisplay.innerHTML = `Computer Wins: ${computerWins}`
    drawsDisplay.innerHTML = `Draws: ${draws}`
    historyDisplay.innerHTML = `History: <br>${history.join('<br>')}`
}

function trackPlayerChoice(choice) {
    if (lastChoice !== null) {
        playerChoices[choice]++;
    }
    lastChoice = choice;
}

function predictPlayerChoice() {
    // look for the choice w/ the max count
    return Object.keys(playerChoices).reduce((a,b) => playerChoices[a] > playerChoices[b] ? a : b);
}

function getAIChoice() {
    let predictedChoice = predictPlayerChoice();
    // Decide the best counter to the predicted choice
    switch (predictedChoice) {
        case 'rock':
            return 'paper'; // Paper covers rock
        case 'paper':
            return 'scissors'; // Scissors cut paper
        case 'scissors':
            return 'rock'; // Rock crushes scissors
        default:
            return 'rock'; // Default case if no prediction available
    }
}

function playRound(playerChoice) {
    trackPlayerChoice(playerChoice);
    let aiChoice = getAIChoice();
    console.log("AI predicts:", aiChoice);
    // Here, integrate the logic to determine the winner based on aiChoice and playerChoice
}

document.getElementById('reset').addEventListener('click', resetGame);

function resetGame() {
    // Reset game statistics
    gamesPlayed = 0;
    userWins = 0;
    computerWins = 0;
    draws = 0;
    playerStreak = 0;
    computerStreak = 0;
    currentStreak = { player: 0, computer: 0 };
    history = [];
    decisionTimes = [];

    // Reset UI elements
    gamesPlayedDisplay.innerHTML = 'Games Played: 0';
    userWinsDisplay.innerHTML = 'User Wins: 0';
    computerWinsDisplay.innerHTML = 'Computer Wins: 0';
    drawsDisplay.innerHTML = 'Draws: 0';
    historyDisplay.innerHTML = 'History: ';
    resultDisplay.innerHTML = '';
    userChoiceDisplay.innerHTML = '';
    computerChoiceDisplay.innerHTML = '';

    // Additional UI or game state resets if needed
    console.log('Game has been reset.');
}

function resetGame() {
    if (confirm('Are you sure you want to reset the game?')) {
        // Reset logic here
    }
}

