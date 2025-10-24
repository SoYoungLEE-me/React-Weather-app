import React from "react";
import { useState } from "react";

const WeatherBox = ({ weather }) => {
  const [unit, setUnit] = useState("C");

  const handleUnitChange = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;

  const description = weather.weather[0].description;
  const icon = weather.weather[0].main;

  //UTC기준 시각(utcSeconds)을 도시 시간대로 보정(cityOffsetSec)
  const toCityDate = (utcSeconds, cityOffsetSec) => {
    const localOffsetSec = -new Date().getTimezoneOffset() * 60;
    return new Date((utcSeconds + cityOffsetSec - localOffsetSec) * 1000);
  };

  /*현재 시간 계산 */
  const getLocalTime = () => {
    // 현재 시각(UTC 초 단위)
    const nowUtcSeconds = Math.floor(Date.now() / 1000);
    // 도시 기준 시간으로 변환
    const d = toCityDate(nowUtcSeconds, weather.timezone);

    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;

    return `${ampm} ${displayHour}시 ${minutes}분`;
  };

  /* 일출·일몰 표기 */
  const formatSunTime = (utcSeconds, cityOffsetSec) => {
    const d = toCityDate(utcSeconds, cityOffsetSec);
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${ampm} ${displayHour}시 ${minutes}분`;
  };

  const iconMap = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⚡",
    Drizzle: "🌦️",
    Mist: "🌫️",
  };

  const bgColorMap = {
    Clear: "linear-gradient(135deg, #FF9944, #FF5B79)",
    Clouds: "linear-gradient(135deg, #607D8B, #455A64)",
    Rain: "linear-gradient(135deg, #304FFE, #1976D2)",
    Snow: "linear-gradient(135deg, #AEEEEE, #6DD5FA)",
    Thunderstorm: "linear-gradient(135deg, #1C1C1C, #000000)",
    Drizzle: "linear-gradient(135deg, #81C784, #4CAF50)",
    Mist: "linear-gradient(135deg, #757F9A, #D7DDE8)",
    Default: "linear-gradient(135deg, #A200FF, #00C8FF)",
  };

  const bgColor = bgColorMap[icon] || bgColorMap["Default"];

  return (
    <div
      className="weather-display"
      style={{
        background: bgColor,
      }}
    >
      {/* 섭씨 화씨 변환 토글 */}
      <div className="unit-toggle">
        <button
          className={`unit-option ${unit === "C" ? "active" : ""}`}
          onClick={() => handleUnitChange("C")}
        >
          °C
        </button>
        <button
          className={`unit-option ${unit === "F" ? "active" : ""}`}
          onClick={() => handleUnitChange("F")}
        >
          °F
        </button>
      </div>

      {/* 날씨 아이콘 */}
      <div id="weather-icon" className="weather-icon">
        {iconMap[icon] || "🌈"}
      </div>

      {/* 도시 이름 */}
      <h2 id="city-name" className="city-name">
        {weather.name}
      </h2>

      {/* 지역 시간 (향후 구현 예정) */}
      <p id="local-time" className="local-time">
        {getLocalTime()}
      </p>

      {/* 현재 온도 (섭씨 기준) */}
      <p className="temperature">
        {unit === "C" ? `${Math.round(tempC)}°C` : `${Math.round(tempF)}°F`}
      </p>

      {/* 날씨 설명 */}
      <p id="weather-condition" className="weather-condition">
        {description}
      </p>

      {/* 일몰, 일출*/}
      <div className="unit-breakdown">
        <div className="unit-block">
          <span className="unit-label">일출</span>
          <span className="unit-value">
            {formatSunTime(weather.sys.sunrise, weather.timezone)}
          </span>
        </div>
        <div className="unit-block">
          <span className="unit-label">일몰</span>
          <span className="unit-value">
            {formatSunTime(weather.sys.sunset, weather.timezone)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
