import trips from "./data/trips";
import Trip from "./Trip";

function App() {
  return (
    <div className="app">
      <Header />
        {trips.map((trip) => (
          <Trip
            key={trip.id}
            username={trip.username}
            caption={trip.caption}
            position={trip.position}
            image={trip.image}
          />
        ))}
    </div>
  );
}

const Header = () => {
  return (
    <div className="site-header">
      <div className="title">
        <h1>Trips</h1>
      </div>
    </div>
  );
};

export default App;
