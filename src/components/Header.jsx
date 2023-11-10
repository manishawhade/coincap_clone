import { Box, Button, TextField, Typography } from "@mui/material";
import SearchBar from "./Searchbar";

export default function Header({ handleSearch }) {
  return (
    <Box
      sx={{
        margin: "0 10% 5px 10%",
        display: "flex",
        justifyContent: "space-between",
        mt: 1,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Button>Coins</Button>
        <Button>Exchanges</Button>
        <Button>Swap</Button>
      </Box>
      <img
        src="https://coincap.io/static/logos/black.svg"
        alt="logo"
        width={100}
      />
      <SearchBar handleSearch={handleSearch} />
    </Box>
  );
}
