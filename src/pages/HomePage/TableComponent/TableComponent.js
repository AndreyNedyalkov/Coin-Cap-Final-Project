import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import RowComponent from "./TableRowComponent";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainTableHead from "./MainTableHead";
import { addToFetchSlice } from "../../../store/FetchSlice";
import Loader from "../../../components/Loader/LoaderComponent";

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

export default function MainTable(props) {
  let fetchedCoins = useSelector((state) => state.fetchSlice.fetchCoins);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("rank");
  const [coins, loading] = props.FetchCoins();
  const dispatch = useDispatch();

  useEffect(() => {
    let currentFetchedCoins = [...coins];
    dispatch(addToFetchSlice(currentFetchedCoins));
  }, [coins, dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      {loading ? (
        <Loader class={"HomepageLoader"} sizing={80} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750, columns: 8, background: "#FAFAFA" }}
                aria-labelledby="tableTitle"
                aria-label="collapsible table"
              >
                <MainTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody sx={{ background: "white" }}>
                  {fetchedCoins
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .map((row, index) => {
                      const labelId = { "aria-label": "Checkbox Heart" };
                      return (
                        <RowComponent
                          key={row.uuid}
                          row={row}
                          labelId={labelId}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </>
  );
}
