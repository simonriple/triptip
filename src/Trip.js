const Trip = (props) => {
  return (
    <div className="trip">
      <div className="header">
          {props.username}
        </div>
      <Image src={props.image} />
      <div className="footer">
          <p>{props.caption}</p>
        <a
          href={`https://www.google.com/maps/place/${props.position.latitude},${props.position.longitude}`}
        >
          Google maps{" "}
        </a>
      </div>
    </div>
  );
};

const Image = (props) => {
  return <img src={props.src} alt="bilde" className="image" />;
};

export default Trip;
