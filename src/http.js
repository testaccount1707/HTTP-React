export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3001/places");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3001/user-placesss", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to put data");
  }
  const resData = await response.json();
  return resData.message;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3001/user-places");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return resData.places;
}
