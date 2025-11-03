import React, { useEffect } from "react";

const WeatherButton = ({
  cities,
  onCityChange,
  onCurrentLocation,
  activeCity,
}) => {
  useEffect(() => {
    // 모바일 환경만 long press 감지
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      const wrappers = document.querySelectorAll(".city-btn-wrapper");

      wrappers.forEach((wrapper) => {
        let pressTimer;

        const startPress = () => {
          pressTimer = setTimeout(() => {
            wrapper.classList.add("show-remove");
          }, 600); // 0.6초 이상 누르면 show-remove
        };

        const cancelPress = () => {
          clearTimeout(pressTimer);
        };

        const closeAll = (e) => {
          // remove 버튼이 아닌 곳 누르면 닫기
          if (!e.target.classList.contains("remove-btn")) {
            wrapper.classList.remove("show-remove");
          }
        };

        wrapper.addEventListener("touchstart", startPress);
        wrapper.addEventListener("touchend", cancelPress);
        wrapper.addEventListener("touchmove", cancelPress);
        document.addEventListener("touchstart", closeAll);

        // cleanup
        return () => {
          wrapper.removeEventListener("touchstart", startPress);
          wrapper.removeEventListener("touchend", cancelPress);
          wrapper.removeEventListener("touchmove", cancelPress);
          document.removeEventListener("touchstart", closeAll);
        };
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
