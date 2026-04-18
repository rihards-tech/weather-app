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

export async function getCitySuggestions(query) {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&language=en&count=5`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const { results } = await response.json();

    if (!results || results.length === 0) {
      return [];
    }

    return results.map((item) => {
      return {
        id: `${item.name}-${item.latitude}-${item.longitude}`,
        name: item.name,
        country: item.country,
        lat: item.latitude,
        lng: item.longitude,
      }
    })

  }
  catch (error) {
    console.error('Something went wrong: ', error);
    return null;
  }
}