import React, { useEffect } from "react";

const WeatherButton = ({
  cities,
  onCityChange,
  onCurrentLocation,
  activeCity,
}) => {
  useEffect(() => {
    // 모바일 환경에서만 실행
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      const wrappers = document.querySelectorAll(".city-btn-wrapper");

      const handleClick = (wrapper) => {
        wrapper.classList.toggle("show-remove");
      };

      wrappers.forEach((wrapper) => {
        const listener = () => handleClick(wrapper);
        wrapper.addEventListener("click", listener);

        // cleanup (React unmount 시)
        return () => wrapper.removeEventListener("click", listener);
      });
    }
  }, []);

  return (
    <div className="city-container">
      <div className="cityBtn-top-region">
        <h3 className="city-title">즐겨찾기 한 도시</h3>
        <h3 className="add-city-btn">+ 도시추가</h3>
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
            <button className="remove-btn" onClick={() => console.log("삭제")}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
