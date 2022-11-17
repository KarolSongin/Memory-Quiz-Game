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
    choice1: null,
    choice2: null,
  };

  const [gameState, setGameState] = useState(defaultGame);

  async function newGame(event) {
    if (event.target.id === "start") {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      const cards = [];
      for (let i = 0; i < data.results.length; i++) {
        cards.push({
          question: data.results[i].question,
          questionId: i,
          flipped: false,
        });
        cards.push({
          answer: data.results[i].correct_answer,
          questionId: i,
          flipped: false,
        });
      }
      cards
        .sort(() => Math.random() - 0.5)
        .map((card) => (card.id = Math.random()));
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
    setGameState((prev) => {
      return {
        ...prev,
        time: time,
      };
    });
  }
  function handleChoice(card) {
    if (!gameState.choice1) {
      setGameState((prev) => {
        return {
          ...prev,
          choice1: card,
        };
      });
    } else if (!gameState.choice2) {
      setGameState((prev) => {
        return {
          ...prev,
          choice2: card,
        };
      });
    }
  }
  useEffect(() => {
    if (gameState.choice2) {
      if (gameState.choice1.questionId === gameState.choice2.questionId) {
        setGameState((prev) => {
          return {
            ...prev,
            cards: prev.cards.map((card) => {
              if (card.questionId === gameState.choice1.questionId) {
                return {
                  ...card,
                  flipped: true,
                };
              } else return card;
            }),
          };
        });
        setTimeout(() => {
          resetTurn();
        }, 1000);
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [gameState.choice2]);

  function resetTurn() {
    setGameState((prev) => {
      return {
        ...prev,
        choice1: null,
        choice2: null,
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
        <Cards
          cards={gameState.cards}
          choice1={gameState.choice1}
          choice2={gameState.choice2}
          onClick={handleChoice}
        />
      )}
      <CurrentTime
        saved={gameState.saved}
        started={gameState.started}
        time={gameState.time}
        lives={gameState.lives}
        saveGame={saveGame}
        quiz={gameState.quiz}
      />
      <BestTime />
    </div>
  );
}
