const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let gameState = {
    grid: Array(5).fill(null).map(() => Array(5).fill(null)),
    turn: 'A',
    players: {},
    moveHistory: []
};

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log("Received data:", data);

        if (data.type === 'game_init') {
            if (!gameState.players[data.playerID]) {
                gameState.players[data.playerID] = { characters: data.characters };
                if (Object.keys(gameState.players).length === 2) {
                    initializeGame();
                }
            }
        } else if (data.type === 'player_move') {
            if (gameState.turn === data.playerID) {
                const result = processMove(data.character, data.move, data.playerID);
                if (result.valid) {
                    gameState.turn = gameState.turn === 'A' ? 'B' : 'A';
                    gameState.moveHistory.push(`${data.character}:${data.move}`);
                    broadcast({ type: 'state_update', gameState });
                } else {
                    ws.send(JSON.stringify({ type: 'invalid_move', message: result.message }));
                }
                checkGameOver();
            }
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function initializeGame() {
    gameState.grid[0] = gameState.players['A'].characters.map(name => ({ name, player: 'A', type: getType(name) }));
    gameState.grid[4] = gameState.players['B'].characters.map(name => ({ name, player: 'B', type: getType(name) }));
    broadcast({ type: 'state_update', gameState });
}

function getType(character) {
    if (character.startsWith('P')) return 'Pawn';
    if (character.startsWith('H1')) return 'Hero1';
    if (character.startsWith('H2')) return 'Hero2';
    return null;
}

function processMove(character, move, playerID) {
    let result = { valid: false, message: '' };
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = gameState.grid[row][col];
            if (cell && cell.name === character && cell.player === playerID) {
                const [newRow, newCol] = calculateNewPosition(row, col, move, cell.type);
                if (isValidMove(newRow, newCol, playerID, cell.type)) {
                    gameState.grid[row][col] = null;
                    gameState.grid[newRow][newCol] = { name: character, player: playerID, type: cell.type };
                    result.valid = true;
                } else {
                    result.message = 'Invalid move.';
                }
                return result;
            }
        }
    }
    result.message = 'Character not found.';
    return result;
}

function calculateNewPosition(row, col, move, type) {
    const moveMap = {
        'Pawn': {
            'L': [0, -1], 'R': [0, 1], 'F': [-1, 0], 'B': [1, 0]
        },
        'Hero1': {
            'L': [0, -2], 'R': [0, 2], 'F': [-2, 0], 'B': [2, 0]
        },
        'Hero2': {
            'FL': [-2, -2], 'FR': [-2, 2], 'BL': [2, -2], 'BR': [2, 2]
        }
    };
    const [dRow, dCol] = moveMap[type][move] || [0, 0];
    return [row + dRow, col + dCol];
}

function isValidMove(row, col, playerID, type) {
    if (row < 0 || row >= 5 || col < 0 || col >= 5) return false;
    const cell = gameState.grid[row][col];
    if (cell && cell.player === playerID) return false;
    if (type === 'Hero1' || type === 'Hero2') {
        // For Hero1 and Hero2, check if there are any characters in between that should be removed
        // Implement detailed checks for Hero1 and Hero2 based on movement rules
    }
    return true;
}

function checkGameOver() {
    const playerAAlive = gameState.grid.flat().some(cell => cell && cell.player === 'A');
    const playerBAlive = gameState.grid.flat().some(cell => cell && cell.player === 'B');
    if (!playerAAlive) {
        broadcast({ type: 'game_over', winner: 'B' });
    } else if (!playerBAlive) {
        broadcast({ type: 'game_over', winner: 'A' });
    }
}

function broadcast(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
