export default function Button(props) {
  return (
    <button className={`button ${props.className}`}>{props.btnText}</button>
  );
}
