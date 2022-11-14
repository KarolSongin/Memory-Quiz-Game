export default function Button(props) {
  return (
    <button
      className={`button ${props.className}`}
      onClick={props.handleClick}
      id={props.id}
    >
      {props.btnText}
    </button>
  );
}
