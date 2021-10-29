import { useState } from "react";
import { useTrips } from "./server";
import { AddTrip } from "./AddTrip";

function App() {
  const { trips, addTrip, addLike, updateTrips } = useTrips();
  return (
    <div className="App">
      <Header onUpdate={updateTrips} />
      {(function renderTrips() {
        const tripcomponents = [];
        if (!trips) return null;
        for (let i = 0; i < trips.length; i++) {
          const trip = trips[i];
          function onAddLike() {
            addLike(trip.id);
          }
          tripcomponents.push(
            <Trip
              key={trip.id}
              username={trip.username}
              caption={trip.caption}
              position={trip.position}
              likes={trip.likes}
              onAddLike={onAddLike}
            >
              <Image src={trip.image} alt={trip.caption} />
            </Trip>
          );
        }
        return tripcomponents;
      })()}
      <AddTrip onAddTrip={addTrip} />
    </div>
  );
}

function Header(props) {
  return (
    <div className="site-header">
      <div className="title">
        <button className="emoji-button" onClick={props.onUpdate}>
          <h1>⛰️</h1>
        </button>
      </div>
    </div>
  );
}

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
        <Likes likes={props.likes} onAddLike={props.onAddLike} />
      </div>
    </div>
  );
}

function Image(props) {
  return <img src={props.src} alt={props.alt} className="image" />;
}

function Likes(props) {
  return (
    <div className="likes">
      Likes: {props.likes}
      <button className="like-button" onClick={props.onAddLike}>
        👍
      </button>
    </div>
  );
}

export default App;
