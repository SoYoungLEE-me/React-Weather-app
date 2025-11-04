import React from "react";

const WeatherButton = ({
  cities,
  onCityChange,
  onCurrentLocation,
  activeCity,
  onAddCity,
  onRemoveCity,
}) => {
  return (
    <div className="city-container">
      <div className="cityBtn-top-region">
        <h3 className="city-title">즐겨찾기 한 도시</h3>
        <h3 className="add-city-btn" onClick={onAddCity}>
          + 도시추가
        </h3>
      </div>

      <div className="city-buttons">
        <button
          className={`city-btn ${activeCity === "current" ? "active" : ""}`}
          onClick={onCurrentLocation}
        >
          현재 위치
        </button>

        {cities.map((city) => (
          <div key={city} className="city-btn-wrapper">
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
            <button
              className="remove-btn"
              onClick={() => {
                onRemoveCity(city);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
