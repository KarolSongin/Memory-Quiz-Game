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
        const id = Math.random();
        cards.push({
          question: data.results[i].question,
          id: id,
          flipped: false,
        });
        cards.push({
          answer: data.results[i].correct_answer,
          id: id,
          flipped: false,
        });
      }
      cards.sort(() => Math.random() - 0.5);
      setGameState((prev) => {
        return {
          ...defaultGame,
          started: true,
          lives: 6,
          quiz: data.results,
          cards: cards,
          time: 0,
        };
      });
    }
  }
  function pauseGame() {
    setGameState((prev) => {
      return {
        ...prev,
        started: false,
        saved: true,
      };
    });
  }
  function saveGame(time) {
    console.log("saved");
    setGameState((prev) => {
      return {
        ...prev,
        time: time,
      };
    });
  }

  console.log(gameState);
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
        handleClick={pauseGame}
        id="pause"
      />
      <Lives />
      {gameState.cards.length === 0 ? (
        <p className="startGame-text">Start playing by pressing "new game"</p>
      ) : (
        <Cards cards={gameState.cards} />
      )}
      <CurrentTime
        saved={gameState.saved}
        started={gameState.started}
        time={gameState.time}
        lives={gameState.lives}
        saveGame={saveGame}
      />
      <BestTime />
    </div>
  );
}
