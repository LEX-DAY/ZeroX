const player = {
    X: 'X',
    O: 'O'
}

const initialState = () => {
    return {
        i:0,
        player: player.X,
        cells: new Array(9).fill(null)
    }
};

let state = initialState();

const arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const table = document.querySelector('.table');

const btns = state.cells.forEach((item, index) => {
    let div = document.createElement('div');
    div.className = 'table-section';
    div.id = index + 1;
    table.append(div);
});

table.addEventListener('click', function(event) {
    const cardId = event.target.id;
    const card = document.getElementById(cardId);
    tryOpenCard(card);
    if (state.cells.every((cell) => cell !== null)){
        refreshGame();
        console.log('Ничья');
    }
        
});

function tryOpenCard(card) {
    const isCardOpened = card && (card.classList.contains(player.X) || card.classList.contains(player.O));
 
    if (!isCardOpened) {
        if (state.player === player.X){
            card.classList.add(player.X);
            card.innerHTML = player.X;
            state.cells[card.id-1] = true;
        } else {
            card.classList.add(player.O);
            card.innerHTML = player.O;
            state.cells[card.id-1] = false;
        }
        const resultOfTurn = checkWiner();

        if (resultOfTurn !== null){
            if (resultOfTurn)
                console.log('Победил X');
            else
                console.log('Победил O');
            refreshGame()
            return;
        }
        nextTurn();
    }
}

function refreshGame() {
    state = initialState();

    const openedCells = [
        ...table.querySelectorAll('.' + player.X),
        ...table.querySelectorAll('.' + player.O)
    ];
    
    openedCells.forEach(cell => {
        cell.classList.remove(player.X, player.O);
        cell.innerHTML = '';
    });
}

function nextTurn() {
    ++state.i;
    state.player = state.i % 2 === 0 ? player.X : player.O; 
}

function checkWiner() {
    if ((state.i + 1) >= 5){
        const openedCombos = [];

        arr.forEach((combo) => {
            const isComboCardsOpened = combo.every(n => state.cells[n] !== null);

            if (isComboCardsOpened)
                openedCombos.push(combo); 
        });

        if (openedCombos.some(comboSet => comboSet.every(comboSetIndex => state.cells[comboSetIndex] === true)))
            return true;

        else if (openedCombos.some(comboSet => comboSet.every(comboSetIndex => state.cells[comboSetIndex] === false)))
            return false;

        return null;
    } else return null;    
}