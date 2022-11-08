import React from "react";
import BlueBarAdaptive from "../HomePage/BlueBarUnderHeader/BlueBarAdaptive";
import ExchangesTable from "./TableComponent/TableComponent";
import "../HomePage/Home.css"

export default function Exchanges() {
  return (
    <>
      <BlueBarAdaptive
      />
      <div className="MainWrapper">
        <ExchangesTable/>
      </div>
    </>
  );
}
