import React, { useState } from "react";
import { TextField, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ handleSearch }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setSearchValue("");
    handleSearch("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isSearchVisible && (
        <Paper elevation={3} style={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            label="Search"
            value={searchValue}
            onChange={(e) => {
              handleSearch(e.target.value);
              setSearchValue(e.target.value);
            }}
            defaultValue="Small"
            size="small"
          />
        </Paper>
      )}
      <IconButton onClick={toggleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
