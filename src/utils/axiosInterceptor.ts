// Addition of params and API key
import axios from "axios";
import { apiForecastUrl, apiKey } from "./constants";

export const request = (cityName: string) => {
  // Based on sample API
  // https://api.openweathermap.org/data/2.5/weather - url
  // ?q - cityName param
  // &appid - api key param
  if (cityName)
    return axios.get(
      `${apiForecastUrl}?q=${cityName}&units=metric&appid=${apiKey}`
    );
};
