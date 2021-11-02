import { useState } from "react";
import { useTrips } from "./server";
import { AddTrip } from "./AddTrip";

function App() {
  const { trips, addTrip, addLike, addComment, updateTrips } = useTrips();
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
          function onAddComment(comment) {
            console.log(comment)
            addComment(trip.id, comment);
          }
          tripcomponents.push(
            <Trip
              key={trip.id}
              username={trip.username}
              caption={trip.caption}
              position={trip.position}
              likes={trip.likes}
              onAddLike={onAddLike}
              comments={trip.comments}
              onAddComment={onAddComment}
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
        <Comments comments={props.comments} />
        <CommentForm onAddComment={props.onAddComment} />
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

function Comments(props) {
  
  function renderComment(comment,id) {
    return (
      <div key={id} className="comment">
        <p className="comment-username">{comment.username}</p>
        <p className="comment-text">{comment.text}</p>
      </div>
    );
  }

  if(!props.comments || props.comments.length === 0) return null;

  return <div className="comments">{props.comments.map(renderComment)}</div>;
}

function CommentForm(props) {
  const [comment, setComment] = useState("");
  function onChangeComment (event) {
    setComment(event.target.value)
  }
  function addComment(){
    props.onAddComment(comment)
    setComment("")
  }
  return (
    <div className="comment-form">
      <input value={comment} onChange={onChangeComment} placeholder="Skriv inn kommentar"/>
      <button className="comment-form-button" onClick={addComment} >Publiser</button>
    </div>
  )
}

export default App;
