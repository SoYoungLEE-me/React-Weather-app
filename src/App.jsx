import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import WeatherBox from "./components/WeatherBox.jsx";
import "./App.css";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
//2. 날씨 정보에는 도시. 섭씨, 화씨 날씨 생태가 보인다.
//3. 5개의 버튼이 있다.
//4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
function App() {
  const [weather, setWeather] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      const data = await getCurrentWeather(lat, lon);
      setWeather(data);
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      {weather ? <WeatherBox weather={weather} /> : <p>날씨 불러오는 중...</p>}
    </div>
  );
}

export default App;
