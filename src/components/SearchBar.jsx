import React from "react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      alert("도시 이름을 입력해주세요! (예: seoul, busan)");
      return;
    }
    onSearch(trimmed); // 부모(App)에서 전달받은 onSearch 함수 호출
    setQuery(""); // 입력창 초기화
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div class="search-bar">
      <input
        type="text"
        placeholder="새로운 도시를 검색하거나 추가하세요"
        id="city-search-input"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={() => {
          handleSearch();
        }}
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
