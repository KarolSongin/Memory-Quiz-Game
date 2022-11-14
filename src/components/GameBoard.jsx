import { useEffect, useState } from "react";
import Button from "./Button";
import Lives from "./Lives";
import Cards from "./Cards";
import CurrentTime from "./CurrentTime";
import BestTime from "./BestTime";

export default function GameBoard() {
  const defaultGame = {
    started: false,
    lives: 0,
    saved: false,
    time: 0,
    bestTime: 0,
    completed: false,
    cards: [],
  };
  const [gameState, setGameState] = useState(defaultGame);

  async function newGame(event) {
    if (event.target.id === "start") {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18"
      );
      const data = await response.json();
      const cards = [];
      for (let i = 0; i < data.results.length; i++) {
        cards.push(data.results[i].question);
        cards.push(data.results[i].correct_answer);
      }
      cards.sort(() => Math.random() - 0.5);
      if (gameState.time === 0) {
        const interval = setInterval(() => {
          setGameState((prev) => {
            return {
              ...defaultGame,
              started: true,
              lives: 6,
              quiz: data.results,
              cards: cards,
              time: prev.time + 1,
              interval,
            };
          });
        }, 1000);
      } else if (gameState.time > 0) {
        setGameState((prev) => {
          return {
            ...prev,
            started: true,
            lives: 6,
            quiz: data.results,
            cards: cards,
            time: 0,
          };
        });
      }
    } else if (event.target.id === "pause") {
      clearInterval(gameState.interval);
    }
  }

  return (
    <div className="game-board">
      <Button
        btnText="New game"
        className="btn-start"
        handleClick={newGame}
        id="start"
      />
      <Button
        btnText="Pause & save"
        className="btn-pause"
        handleClick={newGame}
        id="pause"
      />
      <Lives />
      {gameState.cards.length === 0 ? (
        <p className="startGame-text">Start playing by pressing "new game"</p>
      ) : (
        <Cards cards={gameState.cards} />
      )}
      <CurrentTime time={gameState.time} />
      <BestTime />
    </div>
  );
}
