import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowComponent from "./TableRowComponent";
import {TableHeadCells} from "./TableHeadCells"
import  { useState, useEffect } from "react";
import { API_KEY } from "../../../secrets";

const headCells = TableHeadCells()
function MainTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ExchangesTable() {
  const [arrOfFakeResponse, setExchanges] = useState([]);
 
  useEffect(() => {
    const optionsReq = {
        method: "GET",
        headers: {
          "x-access-token": API_KEY
        },
      };
    const limitPage = 40
      fetch(`https://api.coinranking.com/v2/exchanges?limit=${limitPage}&offset=0&orderBy=24hVolume&orderDirection=desc`,optionsReq)
      .then((res) => res.json())
      .then((data) => {
        setExchanges(data.data.exchanges)})
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, columns: 8, background: "#FAFAFA" }}
            aria-labelledby="tableTitle"
            aria-label="collapsible table"
          >
            <MainTableHead
            />
            <TableBody sx={{ background: "white" }}>
              {arrOfFakeResponse
                .slice()
                .map((row) => {
                  return (
                    <RowComponent
                      key={row.uuid}
                      row={row}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
