import Card from "./Card";
export default function Cards(props) {
  const cards = props.cards.map((card) => {
    return (
      <Card
        id={card.id}
        text={card.question || card.answer}
        key={Math.random()}
      />
    );
  });
  return <div className="cards">{cards}</div>;
}
