import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCloud,
  faSnowflake,
  faWind,
  faSun,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./WeatherCard.css";
import { secondaryColor } from "../utils/constants";

type WeatherCardProps = {
  climateDataList: any[];
};

function getWeatherIcon(weather: string) {
  let iconName: IconProp = faSun;
  switch (weather) {
    case "Clear":
      iconName = faSun;
      break;
    case "Rain":
      iconName = faCloudShowersHeavy;
      break;
    case "Clouds":
      iconName = faCloud;
      break;
    case "Snow":
      iconName = faSnowflake;
      break;
    default:
      iconName = faSun;
      break;
  }
  return iconName;
}

function getDay(dayNumber: number) {
  switch (dayNumber) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "NaN";
  }
}
class WeatherCard extends React.Component<WeatherCardProps> {
  render() {
    const today: any = this.props.climateDataList[0];
    return (
      <div className="weather-container">
        <div className="weather-today">
          <div className="today-label">Today</div>
          <div className="custom-flex-center">
            <div style={{ marginRight: 10 }}>
              {today && (
                <FontAwesomeIcon
                  icon={getWeatherIcon(today.weather[0].main)}
                  size={"4x"}
                  color={secondaryColor}
                />
              )}
            </div>
            <div
              className="custom-flex-center custom-flex-column"
              style={{
                alignItems: "flex-start",
                marginLeft: 10,
              }}
            >
              <div style={{ fontFamily: "Teko", fontSize: 56 }}>
                {today && Math.floor(today.main.temp)}
                &#176;
              </div>
              <span>{today && today.weather[0].main}</span>
            </div>
          </div>
        </div>
        <div className="custom-flex-center weather-days-container">
          {this.props.climateDataList &&
            this.props.climateDataList
              .slice(1, this.props.climateDataList.length + 1)
              .map((nextDayForecast: any, index) => (
                <div key={index} className="custom-flex-column weather-day">
                  <div className="day-label" style={{ fontSize: 16 }}>
                    {nextDayForecast &&
                      getDay(new Date(nextDayForecast.dt * 1000).getDay())}
                  </div>
                  <div>
                    {nextDayForecast && (
                      <FontAwesomeIcon
                        icon={getWeatherIcon(nextDayForecast.weather[0].main)}
                        size={"xl"}
                        color={secondaryColor}
                      />
                    )}
                  </div>
                  <div
                    className="day-label"
                    style={{
                      fontFamily: "Teko",
                      fontSize: 32,
                    }}
                  >
                    {(nextDayForecast &&
                      Math.floor(nextDayForecast.main.temp)) ||
                      0}
                    &#176;
                  </div>
                </div>
              ))}
        </div>
      </div>
    );
  }
}
export default WeatherCard;
