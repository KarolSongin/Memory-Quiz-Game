export default function Card(props) {
  function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  return (
    <div className="card">
      <div className="card-front">{decodeHTML(props.text)}</div>
      <div className="card-back"></div>
    </div>
  );
}
