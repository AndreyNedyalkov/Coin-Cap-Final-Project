import "./CoinDetailHiLowPrices.css";
import React from "react";
import { useSelector } from "react-redux";
import CheckboxComponent from "../../../components/Checkbox";

export default function CoinDetailHiLowPrices() {
  const symbol = useSelector((state) => state.blueBarAssets.symbol);
  const name = useSelector((state) => state.blueBarAssets.name);
  const iconUrl = useSelector((state) => state.blueBarAssets.iconUrl);
  const change = useSelector((state) => state.blueBarAssets.change);
  const high = useSelector((state) => state.blueBarAssets.high);
  const low = useSelector((state) => state.blueBarAssets.low);
  const average = useSelector((state) => state.blueBarAssets.average);
  const uuid = useSelector((state) => state.blueBarAssets.uuid);

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return (
    <div className="coin-detail-container">
      <div>
        {" "}
        <CheckboxComponent checkForUUID={uuid}></CheckboxComponent>
      </div>
      <div className="coin-detail-block">
        <div className="icon-container">
          <img src={iconUrl}></img>
        </div>
        <div className="coin-name-symbol">
          <h3>
            {name} ({symbol})
          </h3>
          <p>{formattedToday}</p>
        </div>
      </div>

      <div className="coin-detail-block">
        <div>
          <span>
            HIGH <p>${high}</p>
          </span>
          <span>
            LOW <p>${low}</p>
          </span>
        </div>
        <div>
          <span>
            AVERAGE <p>${average}</p>
          </span>
          <span>
            CHANGE <p>{change}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
