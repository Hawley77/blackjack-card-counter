const deckSelector = document.getElementById('deckSelector') as HTMLSelectElement;
const runningCountElement = document.getElementById('runningCount') as HTMLElement;
const trueCountElement = document.getElementById('trueCount') as HTMLElement;
const betIndicator = document.getElementById('betIndicator') as HTMLElement;
const clearButton = document.getElementById('clearButton') as HTMLButtonElement;

let runningCount = 0;
let decksInPlay = parseInt(deckSelector.value);

// Card values for card counting
const cardValues = {
  '2': 1, '3': 1, '4': 1, '5': 1, '6': 1,
  '7': 0, '8': 0, '9': 0,
  '10': -1, 'J': -1, 'Q': -1, 'K': -1, 'A': -1
};

// Handle deck selection change
deckSelector.addEventListener('change', () => {
  decksInPlay = parseInt(deckSelector.value);
  updateTrueCount();
});

// Handle card button clicks
document.querySelectorAll('.card-btn').forEach(btn => {
  btn.addEventListener('click', (event) => {
    const value = (event.target as HTMLButtonElement).getAttribute('data-value');
    runningCount += cardValues[value];
    updateUI();
  });
});

// Clear button listener
clearButton.addEventListener('click', () => {
  runningCount = 0;
  updateUI();
});

// Update the running count and true count
function updateUI() {
  runningCountElement.innerText = runningCount.toString();
  updateTrueCount();
}

// Update the true count based on running count and remaining decks
function updateTrueCount() {
  const remainingDecks = decksInPlay - Math.floor(runningCount / 52);
  const trueCount = (runningCount / remainingDecks).toFixed(2);
  trueCountElement.innerText = trueCount;

  if (parseFloat(trueCount) > 2) {
    betIndicator.innerText = 'Bet Big';
    betIndicator.classList.add('text-green-500');
    betIndicator.classList.remove('text-red-500');
  } else {
    betIndicator.innerText = 'Bet Low';
    betIndicator.classList.add('text-red-500');
    betIndicator.classList.remove('text-green-500');
  }
}
