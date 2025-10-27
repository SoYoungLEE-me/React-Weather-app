import React from "react";

const SearchBar = () => {
  return (
    <div class="search-bar">
      <input
        type="text"
        placeholder="새로운 도시를 검색하거나 추가하세요"
        id="city-search-input"
      />
      <button>검색</button>
    </div>
  );
};

export default SearchBar;
