import GameBoard from "./GameBoard";

export default function App() {
  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">Memory quiz game</h1>
        <h2 className="app-sub-title">
          Train memory and improve your knowledge!
        </h2>
        <GameBoard />
      </div>
    </div>
  );
}
