import { useEffect, useState } from "react";
import Places from "./Places.jsx";

import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        let places = await fetchAvailablePlaces();
        console.log(places);
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Couldn't find a places please try again later!",
        });
        setIsFetching(false);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <p>An error occured</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <Places
      isFetching={isFetching}
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
