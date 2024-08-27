# Sharath_21BCE7444

Here's a sample `README.md` file that you can use for your GitHub repository:

---

# Chess-Like Game v1.1

This is a simple chess-like game implemented using WebSockets, allowing two players to connect and play in real-time. The game features a 5x5 grid and different types of characters with unique movement patterns.

## Features

- **Real-Time Multiplayer:** Two players can connect and play the game simultaneously.
- **Simple Grid-Based Gameplay:** The game is played on a 5x5 grid with characters that have unique movement abilities.
- **WebSocket Communication:** The game uses WebSockets for real-time communication between the server and the clients.
- **Move History:** The game tracks and displays a history of moves made by both players.

## Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it from [Node.js](https://nodejs.org/).
- **Web Browser:** A modern web browser that supports WebSockets.

### Step-by-Step Guide

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/chess-like-game.git
   cd chess-like-game
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the required dependencies:

   ```bash
   npm install ws
   ```

3. **Start the WebSocket Server:**

   Run the server using Node.js:

   ```bash
   node server.js
   ```

4. **Open the Client in a Browser:**

   Open the `index.html` file in your web browser by either:

   - Double-clicking the file, or
   - Dragging the file into a browser window.

5. **Play the Game:**

   - Open two browser tabs for Player A and Player B.
   - Enter the player ID (`A` or `B`) and characters as prompted.
   - Begin playing the game!

## How to Play

1. **Select Player ID:**
   - When prompted, enter `A` or `B` to choose your player.

2. **Choose Characters:**
   - Enter a list of characters (e.g., `P1,H1,P2,P3,H2`) when prompted.

3. **Make a Move:**
   - Click on your character to select it, then choose a direction (`L`, `R`, `F`, `B`) to move.

4. **Win the Game:**
   - The game continues until one player has no characters left on the board.

## File Structure

- `server.js` - The WebSocket server that handles game logic and communication between players.
- `index.html` - The client-side application that renders the game grid and handles user interactions.
- `README.md` - This file, providing information about the project.

## Dependencies

- `ws`: A simple WebSocket library for Node.js.

## Future Enhancements

- **Improved Graphics:** Enhance the visual elements of the game.
- **AI Player:** Implement an AI player to allow single-player mode.
- **Expanded Rules:** Add more complex rules and character types for a richer gameplay experience.
