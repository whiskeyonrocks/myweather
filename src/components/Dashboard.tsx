import React from "react";
import "./Dashboard.css";
import WeatherCard from "./WeatherCard";
import { Cities, City } from "../utils/constants";
import { fetchWeatherDetails } from "../queries/openWeatherMap";

type DashboardState = {
  selectedCity: City;
  climateDataList: any[];
};

class Dashboard extends React.Component {
  state = {
    selectedCity: Cities[0],
    climateDataList: [],
  };

  handleClick = (selectedCity: City) => {
    if (this.state.selectedCity.name !== selectedCity.name) {
      this.setState((prevState: DashboardState) => ({
        ...prevState,
        selectedCity,
      }));
    }
  };

  componentDidMount = () => {
    fetchWeatherDetails(this.state.selectedCity.name)?.then((res) => {
      const climateDataList = this.generateClimateData(res);
      this.setState((prevState: DashboardState) => ({
        ...prevState,
        climateDataList,
      }));
    });
  };

  generateClimateData = (res: any) => {
    return res.data && res.data.list && res.data.list.length === 40
      ? [4, 12, 20, 28, 36].map((listNo) => res.data.list[listNo])
      : [];
  };

  componentDidUpdate = (prevProps: any, prevState: DashboardState) => {
    if (this.state.selectedCity.name !== prevState.selectedCity.name) {
      fetchWeatherDetails(this.state.selectedCity.name)?.then((res) => {
        const climateDataList = this.generateClimateData(res);
        this.setState((prevState: DashboardState) => ({
          ...prevState,
          climateDataList,
        }));
      });
    }
  };

  render() {
    return (
      <div className="custom-flex-center custom-flex-column">
        <div className="custom-flex-center">
          {Cities.map((city: City) => {
            return (
              <button
                key={city.id}
                className={
                  this.state.selectedCity.name === city.name ? "active_btn" : ""
                }
                onClick={(e) => this.handleClick(city)}
              >
                {city.name}
              </button>
            );
          })}
        </div>
        <div className="weather-card">
          {this.state.climateDataList && (
            <WeatherCard climateDataList={this.state.climateDataList} />
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
