import { useEffect, useState } from "react";
import { citiesWeather, getCurrentWeather } from "./api/weather";
import WeatherBox from "./components/WeatherBox";
import LocationErrorModal from "./components/LocationErrorModal";
import { ClipLoader } from "react-spinners";
import "./App.css";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
//2. 날씨 정보에는 도시. 섭씨, 화씨 날씨 생태가 보인다.
//3. 5개의 버튼이 있다.
//4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
function App() {
  const [weather, setWeather] = useState(null);
  let [loading, setLoading] = useState(true);
  const [activeCity, setActiveCity] = useState("current");
  const [locationError, setLocationError] = useState(false);

  const cities = ["paris", "new york", "tokyo", "seoul", "busan"];

  const getCurrentLocation = () => {
    setActiveCity("current");
    setWeather(null);
    setLoading(true);
    // React가 로딩 스피너를 먼저 렌더링하도록 살짝 지연
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const data = await getCurrentWeather(lat, lon);
          setWeather(data);
          setActiveCity("current");
          setLoading(false);
        },
        async (error) => {
          if (error.code === 1) {
            console.error("위치 접근 거부됨:", error);
            setLocationError(true);
          } else if (error.code === 2) {
            alert("현재 위치를 찾을 수 없습니다. 잠시 후 다시 시도해주세요.");
          }

          const fallbackData = await citiesWeather("seoul");
          setWeather(fallbackData);
          setActiveCity("seoul");
          setLocationError(true);
          setLoading(false);
        },
        {
          enableHighAccuracy: false, //빠른 위치 (GPS보다 Wi-Fi 우선)
          maximumAge: 60000, // 1분 이내 위치 캐시 사용 (빠르게)
        }
      );
    }, 0);
  };

  const handleCitySearch = async (cityName) => {
    setActiveCity(cityName);
    setLoading(true);
    const data = await citiesWeather(cityName);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="app-container">
      {loading ? (
        <div className="loading-overlay">
          <ClipLoader />
        </div>
      ) : (
        weather && (
          <WeatherBox
            weather={weather}
            cities={cities}
            onCityChange={handleCitySearch}
            onCurrentLocation={getCurrentLocation}
            activeCity={activeCity}
          />
        )
      )}
      {locationError && (
        <LocationErrorModal onClose={() => setLocationError(false)} />
      )}
    </div>
  );
}

export default App;
