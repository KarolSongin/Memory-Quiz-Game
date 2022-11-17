export default function Cards(props) {
  function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const cards = props.cards.map((card) => {
    return (
      <div
        className={`card ${card === props.choice1 ? "flipped" : ""}
        ${card === props.choice2 ? "flipped" : ""} ${
          card.flipped ? "flipped" : ""
        }`}
        id={card.id}
        key={Math.random()}
        onClick={() => props.onClick(card)}
      >
        <div className="card-front">
          {decodeHTML(card.question || card.answer)}
        </div>
        <div className="card-back"></div>
      </div>
    );
  });
  return <div className="cards">{cards}</div>;
}
