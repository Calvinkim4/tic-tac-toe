let section = document.querySelector('section');
let h2Text = document.querySelector('h2');
let resetButton = document.getElementById('reset-button');
let turn = 0;
let gameOver = false;
let player1Array = [];
let player2Array = [];
let comboArray = [
	['0', '1', '2'],
	['0', '3', '6'],
	['0', '4', '8'],
	['1', '4', '7'],
	['2', '5', '8'],
	['2', '4', '6'],
	['3', '4', '5'],
	['6', '7', '8']
];

// function that restarts game
// resets turn value to zero, gameOver value to false and removes all elements in the arrays
const restartGame = () => {
	h2Text.innerHTML = "PLAYER 1'S TURN";
	h2Text.style.color = "#545a63";
	turn = 0;
	gameOver = false;
	player1Array.splice(0);
	player2Array.splice(0);
	for (let i = 0; i < document.querySelectorAll('div').length; i++) {
		// resetting the divs background and text to default
		document.querySelectorAll('div')[i].innerHTML = "";
		document.querySelectorAll('div')[i].style.backgroundColor = 'white';
	}
}

// clicking reset button will result in calling restartGame function
resetButton.addEventListener('click', restartGame);

// created hover over effect to h2 to change to a reset button
h2Text.addEventListener('mouseover', function() {
	h2Text.style.display = 'none';
	resetButton.style.display = "block";
});

// created hover off effect to change reset button back to h2
resetButton.addEventListener('mouseout', function() {
	h2Text.style.display = 'block';
	resetButton.style.display = 'none';
})

// start button changes the display on the window. the grid is shown and h1 is gone
let startButton = document.getElementById('start-button');
const startGame = () => {
	document.querySelector('h1').style.display = 'none';
	h2Text.innerHTML = "PLAYER 1'S TURN";
	h2Text.style.color = "#545a63";
	h2Text.style.fontSize = "50px";
	startButton.style.display = 'none';
	section.style.display = 'flex';
}
startButton.addEventListener('click', startGame);

// function that checks if the player arrays include the values in combo array 
// whether it does or not, it sets gameOver to true
const checkWinner = () => {
	for (let i = 0; i < 8; i ++) {
		let first = comboArray[i][0];
		let second = comboArray[i][1];
		let third = comboArray[i][2];
		if (player1Array.includes(first) && player1Array.includes(second) && player1Array.includes(third)) {
			h2Text.innerHTML = "PLAYER1 WINS!"
			h2Text.style.color = "#545a63";
			gameOver = true;
		} else if (player2Array.includes(first) && player2Array.includes(second) && player2Array.includes(third)) {
			h2Text.innerHTML = "PLAYER2 WINS!"
			h2Text.style.color = "#0cb765";
			gameOver = true;
		} else {
			if (turn >= 9) {
				h2Text.innerHTML = "NO WINNER!";
				h2Text.style.color = 'red';
				gameOver = true;
			}
		}
	}
}

// sets cell background and text and pushes the divs class name value to the sorted arrays
// also checks whether or not the cell can be changed
const checkCell = (evt) => {
	if (!gameOver) {
		if (evt.target.innerHTML === '') {
		if (turn % 2 === 0){
			evt.target.innerHTML = "X";
			h2Text.innerHTML = "PLAYER 2'S TURN";
			h2Text.style.color = "#0cb765";
			evt.target.style.backgroundColor = "#545a63";
			player1Array.push(evt.target.classList.value);
			player1Array.sort();
		} else {
			evt.target.innerHTML = "O";
			h2Text.innerHTML = "PLAYER 1'S TURN";
			h2Text.style.color = "#545a63";
			evt.target.style.backgroundColor = "#0cb765";
			player2Array.push(evt.target.classList.value);
			player2Array.sort();
		}
		turn++;
	}
	checkWinner();
	}
	
}

// creates the divs that make the grid. Added event listener to each divs
const createGrid = () => {
	for (let i = 0; i < 9; i++) {
		let cell = document.createElement('div');
		cell.classList.add(i);
		cell.addEventListener('click', checkCell);
		section.appendChild(cell);
	}
	
}

createGrid();
