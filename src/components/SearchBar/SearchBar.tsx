import { ReactElement, useCallback } from "react";
import "./SearchBar.css";
import searchLogo from "../../images/search.png";

interface ContainerProps {
  searchTerm: string;
  isSearching: boolean;
  setSearchTerm: (search: string) => void;
  setIsSearching: (active: boolean) => void;
}

function SearchBar({ searchTerm, isSearching, setSearchTerm, setIsSearching }: ContainerProps): ReactElement {
  const onInputClick = useCallback(
    (search: string) => {
      if (!isSearching) {
        setIsSearching(true);
      }
      console.log(search);
      setSearchTerm(search);
    },
    [searchTerm]
  );

  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Enter game name"
          onChange={(event) => {
            onInputClick(event.target.value);
          }}
        />
        <button type="submit" className="searchButton">
          <img src={searchLogo} alt="searchLogo" className="searchLogo" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
