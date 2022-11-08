import { TableRow, TableCell, Box } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import "../Home.css";
import MainGraph from "../../AssetsPage/MainGraph";

export default function CollapseTable(props) {
  const timePeriod = "24h";
  const rangeSelectorEnabler = false;
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <div className="LastTwentyFourHoursCollapseMenu">Last 24 Hours</div>
            <MainGraph
              uuid={props.row.uuid}
              symbol={props.row.symbol}
              timePeriod={timePeriod}
              rangeSelectorEnabler={rangeSelectorEnabler}
            ></MainGraph>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
