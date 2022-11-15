export default function Card(props) {
  function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function clickHandle(e) {
    e.currentTarget.classList.toggle("flipped");
  }
  return (
    <div className="card" onClick={clickHandle} id={props.id}>
      <div className="card-front">{decodeHTML(props.text)}</div>
      <div className="card-back"></div>
    </div>
  );
}
