import React from "react";

const WeatherButton = ({ cities, onCityChange, onCurrentLocation }) => {
  const cityButtons = document.querySelectorAll(".city-btn");

  cityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      cityButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  return (
    <div className="city-container">
      <h3 className="city-title">즐겨찾기 한 도시</h3>
      <div className="city-buttons">
        <button
          className="city-btn current"
          onClick={() => {
            onCurrentLocation();
          }}
        >
          현재 위치
        </button>
        {cities.map((city) => (
          <button
            className="city-btn current"
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
