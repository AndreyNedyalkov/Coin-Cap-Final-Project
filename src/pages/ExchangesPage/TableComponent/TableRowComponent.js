import { TableRow, TableCell } from "@mui/material";
import "./TableComponent.css"
import {FcApproval,FcDisapprove} from "react-icons/fc"

export default function RowComponent(props) {
  return (
    <>
      <TableRow
      >
        <TableCell align="center" component="th"  id={props.labelId} scope="row" padding="none">
          {props.row.rank}
        </TableCell>
        <TableCell 
        align="right">
        <div className="symbolNameLogoContainerCellContainer">
        <img 
            width="35px"
            src={props.row.iconUrl} alt="logo">
        </img>
          <div className="symbolAndLogoCell">
            {props.row.name}
            <p>{props.row.symbol}</p>
          </div>
        </div>
        </TableCell>
        <TableCell align="right">{props.row.numberOfCoins}</TableCell>
        <TableCell align="right">{`$${Number(props.row['24hVolume']).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}</TableCell>
        <TableCell align="right">{`${props.row.marketShare} %`}</TableCell>
        <TableCell align="right">{props.row.recommended === true ?
          <div className="exchangeIcons"><FcApproval/></div>
          : <div className="exchangeIcons"><FcDisapprove/></div>}</TableCell>
        <TableCell align="right">
        </TableCell>
      </TableRow>
    </>
  );
}
