const cities = require('worldcities');

const formattedCities = cities.map((city) => ({
  value: city.name,
  label: city.name,
  country: city.country,
  latlng: [city.lat, city.lng],
}));

const useCities = () => {
  const getAll = () => formattedCities;

  const getByValue = (value) => {
    return formattedCities.find((city) => city.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCities;
