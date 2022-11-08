import React from "react";
import MainTable from "../HomePage/TableComponent/TableComponent";
import BlueBarAdaptive from "../HomePage/BlueBarUnderHeader/BlueBarAdaptive";
import "../HomePage/Home.css";
import useAxios from "../../AxiosHooks/getCoins";
import axios from "../../apis/coinranking";
import { useSelector } from "react-redux";
import "./Watchlist.css"
import { Link } from "react-router-dom";

export default function Watchlist() {
  const watchlist = useSelector((state) => state.watchlistSlice.watchlist);
  const checkLength = watchlist.length === 0 ? true : false;

  function FetchCoins() {
    const [coins, error, loading] = useAxios({
      axiosInstance: axios,
      method: `GET`,
      url: `coins?`,
      requestConfig: {
        params: {
          timePeriod: "24h",
          orderBy: "marketCap",
          orderDirection: "desc",
          offset: "0",
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          uuids: `${watchlist}`,
        },
      },
    });
    return [coins, error, loading];
  }

  return (
    <>
      <BlueBarAdaptive />
      <div className="MainWrapper">
        {checkLength ? (
          <div className="noCoinsContainer">
            <h3 className="noCoinsQuestion"> You still dont have any coins in your watchlist ? </h3>
            <h4 className="noCoinsQuestionLink"> Find your favourite coin from our searchbar or go to our
              <Link to={"/"}> Homepage </Link> 
             </h4>
          </div>
        ) : (
          <MainTable FetchCoins={FetchCoins}></MainTable>
        )}
      </div>
    </>
  );
}
