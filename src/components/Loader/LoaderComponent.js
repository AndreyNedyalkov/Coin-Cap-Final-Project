import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Loader.css"

export default function Loader(props) {
  return (
      <Box className={props.class}>
        <CircularProgress size={props.sizing} />
      </Box>
  );
}
