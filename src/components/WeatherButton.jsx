import React from "react";

const WeatherButton = ({
  cities,
  onCityChange,
  onCurrentLocation,
  activeCity,
}) => {
  return (
    <div className="city-container">
      <h3 className="city-title">즐겨찾기 한 도시</h3>
      <div className="city-buttons">
        <button
          className={`city-btn ${activeCity === "current" ? "active" : ""}`}
          onClick={() => {
            onCurrentLocation();
          }}
        >
          현재 위치
        </button>
        {cities.map((city) => (
          <button
            className={`city-btn ${
              activeCity?.toLowerCase().trim() === city.toLowerCase().trim()
                ? "active"
                : ""
            }`}
            onClick={() => onCityChange(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
