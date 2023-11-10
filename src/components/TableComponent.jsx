import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Button, Typography } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "rank",
    label: "Rank",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "priceUsd",
    label: "Price",
  },
  {
    id: "marketCapUsd",
    label: "Market Cap",
  },
  {
    id: "vwap24Hr",
    label: "VWAP(24Hr)",
  },
  {
    id: "maxSupply",
    label: "Supply",
  },
  {
    id: "volumeUsd24Hr",
    label: "Volume(24Hr)",
  },
  {
    id: "changePercent24Hr",
    label: "Change(24Hr)",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableComponent({ assets, handleViewMore }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("rank");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(() => {
    return stableSort(assets, getComparator(order, orderBy));
  }, [order, orderBy, page, rowsPerPage, assets]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexFlow: "column" }}>
      <Paper
        sx={{ width: "100%", mb: 2, boxShadow: "0px 0px 10px 3px #c6c0c0" }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={assets.length}
            />
            <TableBody>
              {visibleRows &&
                visibleRows.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="right">{row.rank}</TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex", gap: 3 }}>
                          <img
                            src={`https://assets.coincap.io/assets/icons/${row.symbol.toLowerCase()}@2x.png`}
                            alt="icon"
                            height={30}
                            width={30}
                          />
                          <div>
                            {row.name}

                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{ fontFamily: "none" }}
                            >
                              {row.symbol}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {row.priceUsd ? parseFloat(row.priceUsd).toFixed(2) : 0}
                      </TableCell>
                      <TableCell align="right">
                        {row.marketCapUsd
                          ? parseFloat(row.marketCapUsd).toFixed(2)
                          : 0}
                      </TableCell>
                      <TableCell align="right">
                        {row.vwap24Hr ? parseFloat(row.vwap24Hr).toFixed(2) : 0}
                      </TableCell>
                      <TableCell align="right">
                        {row.maxSupply
                          ? parseFloat(row.maxSupply).toFixed(2)
                          : 0}
                      </TableCell>
                      <TableCell align="right">
                        {row.volumeUsd24Hr
                          ? parseFloat(row.volumeUsd24Hr).toFixed(2)
                          : 0}
                      </TableCell>
                      <TableCell align="right">
                        {row.changePercent24Hr
                          ? parseFloat(row.changePercent24Hr).toFixed(2)
                          : 0}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
        sx={{ width: "fit-content", alignSelf: "center", mb: 2 }}
        variant="contained"
        onClick={handleViewMore}
      >
        View More
      </Button>
    </Box>
  );
}
