import Heart from "../images/heart.png";
export default function Lives(props) {
  return (
    <div className="lives">
      <p className="live-text">Lives:</p>
      <img src={Heart} alt="#" className="live-img" />
      <img src={Heart} alt="#" className="live-img" />
      <img src={Heart} alt="#" className="live-img" />
      <img src={Heart} alt="#" className="live-img" />
      <img src={Heart} alt="#" className="live-img" />
      <img src={Heart} alt="#" className="live-img" />
    </div>
  );
}
