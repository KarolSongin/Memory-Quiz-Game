import Button from "./Button";

export default function GameBoard(props) {
  return (
    <div className="game-board">
      <Button btnText="New game" className="btn-start" />
      <Button btnText="Pause & save" className="btn-pause" />
    </div>
  );
}
