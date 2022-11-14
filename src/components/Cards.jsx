import Card from "./Card";
export default function Cards(props) {
  const cards = props.cards.map((card) => {
    return <Card text={card} key={Math.random()} />;
  });
  return <div className="cards">{cards}</div>;
}
