import Button from "./Button";
import Lives from "./Lives";
import Cards from "./Cards";
import CurrentTime from "./CurrentTime";
import BestTime from "./BestTime";
export default function GameBoard(props) {
  return (
    <div className="game-board">
      <Button btnText="New game" className="btn-start" />
      <Button btnText="Pause & save" className="btn-pause" />
      <Lives />
      <Cards />
      <CurrentTime />
      <BestTime />
    </div>
  );
}
