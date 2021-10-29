import { useEffect, useState } from "react";
import { username } from "./username";
const API = "http://localhost:4000/api";

export function useTrips() {
  const [tripFeed, setTripFeed] = useState(null);
  function getTrips(){
      getTripFeed().then((data) => setTripFeed(data));
  }
  useEffect(() => {
      getTrips()
  }, []);

  return {
    trips: tripFeed,
    addTrip: async (trip) => {
        await uploadTrip(trip)
        getTrips();
    },
    addLike: async (tripId) => {
        await uploadLike(tripId);
        getTrips()
    },
    updateTrips: async () => {
        getTrips();
    }
  };
}
const getTripFeed = async () => {
  const tripFeed = await fetch(`${API}/trip`).then((resp) => resp.json());
  return tripFeed;
};

export async function uploadTrip(trip) {
  const newTrip = await fetch(`${API}/trip`, {
    method: "POST",
    body: JSON.stringify({ ...trip, username: username }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
  return newTrip;
}

async function uploadLike(id) {
  const newLikes = await fetch(`${API}/trip/${id}/like`, {
    method: "put",
  }).then((resp) => resp.json());
  return newLikes;
}
