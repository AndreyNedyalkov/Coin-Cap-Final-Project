import "./CoinDetailHiLowPrices.css";
import React from "react";
import Loader from "../../../components/Loader/LoaderComponent";
import defaultIconUrl from "../../../components/Icons/QuestionCoin.png"


export default function CoinDetailPricesLoader() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return (
    <div className="coin-detail-container">
      <div className="coin-detail-block">
        <div className="icon-container">
          <img src={defaultIconUrl}></img>
        </div>
        <div className="coin-name-symbol">
          <h3>
            <Loader class={"AssetLoader"} sizing={25} />
          </h3>
          <p>{formattedToday}</p>
        </div>
      </div>
      <div className="coin-detail-block">
        <div>
          <span>
            HIGH{" "}
           
              <Loader class={"AssetLoader"} sizing={25} />
            
          </span>
          <span>
            LOW{" "}
          
              <Loader class={"AssetLoader"} sizing={25} />
          
          </span>
        </div>
        <div>
          <span>
            AVERAGE{" "}
            
              <Loader class={"AssetLoader"} sizing={25} />
            
          </span>
          <span>
            CHANGE{" "}
           
              
              <Loader class={"AssetLoader"} sizing={25} />
            
          </span>
        </div>
      </div>
    </div>
  );
}
