import TableComponent from "./TableComponent";
import { Box, Button, Typography } from "@mui/material";

export default function MarketData({ assets, handleViewMore }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          background:
            "linear-gradient(to right, rgb(63, 81, 181), rgb(100, 181, 246)) rgb(255, 255, 255)",
          padding: "0 13% 10% 13%",
          color: "white",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h6">MARKET CAP</Typography>
          <Typography variant="body1">$1.40T</Typography>
        </Box>
        <Box>
          <Typography variant="h6">EXCHANGE VOL</Typography>
          <Typography variant="body1">$41.48B</Typography>
        </Box>
        <Box>
          <Typography variant="h6">ASSETS</Typography>
          <Typography variant="body1">2,296</Typography>
        </Box>
        <Box>
          <Typography variant="h6">EXCHANGES</Typography>
          <Typography variant="body1">73</Typography>
        </Box>
        <Box>
          <Typography variant="h6">MARKETS</Typography>
          <Typography variant="body1">9,374</Typography>
        </Box>
        <Box>
          <Typography variant="h6">BTC DOM INDEX</Typography>
          <Typography variant="body1">52.4%</Typography>
        </Box>
      </Box>

      {assets && (
        <Box>
          <Box
            sx={{
              margin: "0 10% 0 10%",
              position: "absolute",
              top: "25%",
            }}
          >
            <TableComponent assets={assets} handleViewMore={handleViewMore} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
