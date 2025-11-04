import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCityStore = create(
  persist(
    (set) => ({
      cities: [],

      addCity: (cityName) =>
        set((state) => {
          const name = cityName.toLowerCase();
          if (state.cities.includes(name)) {
            alert("이미 추가된 도시입니다");
            return state;
          }
          alert(`"${name}" 도시가 즐겨찾기에 추가되었습니다!`);
          return { cities: [...state.cities, name] };
        }),

      removeCity: (cityName) =>
        set((state) => {
          if (window.confirm(`"${cityName}" 도시를 삭제하시겠습니까?`)) {
            return {
              cities: state.cities.filter((city) => city !== cityName),
            };
          }
          return state;
        }),
    }),
    {
      name: "favorite-cities", // localStorage key 이름
    }
  )
);

export default useCityStore;
