export async function searchCity(cityName) {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&language=en&count=1`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const { results } = await response.json();

    if (!results || results.length === 0) {
      return null;
    }
    const { name, latitude: lat, longitude: lng, country } = results[0];

    return { name, lat, lng, country };
  }
  catch (error) {
    console.error('Something went wrong: ', error);
  }
}