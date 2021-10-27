import { useState } from "react";
import trips from "./data/trips";

function App() {
  return (
    <div className="App">
      <Header />
      {(function renderTrips() {
        const tripcomponents = [];
        for (let i = 0; i < trips.length; i++) {
          const trip = trips[i];
          tripcomponents.push(
            <Trip
              key={trip.id}
              username={trip.username}
              caption={trip.caption}
              position={trip.position}
            >
              <Image src={trip.image} alt={trip.caption}/>
            </Trip>
          );
        }
        return tripcomponents;
      })()}
    </div>
  );
}

function Header() {
  return (
    <div className="site-header">
      <div className="title">
        <h1>Trips</h1>
      </div>
    </div>
  );
};

function Trip(props) {
  function makeEarthLink(position) {
    return (
      "https://www.google.com/maps/place/" +
      position.latitude +
      "," +
      position.longitude
    );
  }

  return (
    <div className="trip">
      <div className="header">{props.username}</div>
      {props.children}
      <div className="footer">
        <p>{props.caption}</p>
        <a className="earth" href={makeEarthLink(props.position)}>
          🌍
        </a>
        <Likes />
      </div>
    </div>
  );
};

function Image(props) {
  return <img src={props.src} alt={props.alt} className="image" />;
};

function Likes() {
  const [likes, setLikes] = useState(0);
  function addLike() {
    setLikes(likes + 1);
  }
  return (
    <div className="likes">
      Likes: {likes}
      <button className="like-button" onClick={addLike}>
        👍
      </button>
    </div>
  );
}

export default App;
