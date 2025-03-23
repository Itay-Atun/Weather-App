"use server";

export default async function fetchWeather(city: string) {
  try {
    const data = await fetch(
      `${process.env.BASE_URL}?q=${city}&appid=${process.env.API_KEY}`
    );
    const cityWeatherData = await data.json();
    console.log(
      `Data: ${data} | City: ${city} | WeatherData: ${cityWeatherData}`
    );
    return cityWeatherData;
  } catch (error) {
    return console.log(`Can't fetch data - ${error}`);
  }
}
