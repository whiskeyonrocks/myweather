import { request } from "../utils/axiosInterceptor";

export const fetchWeatherDetails = (cityName: string) => {
  return request(cityName);
};
