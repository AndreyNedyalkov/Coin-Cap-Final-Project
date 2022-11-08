import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlueBarForDetailsOfCoin from "./BlueBarForDetailsOfCoin/BlueBarForDetailsOfCoin";
import CoinDetailHiLowPrices from "./CoinDetailHiLowPrices/CoinDetailHiLowPrices";
import "./Asset.css";
import MainGraph from "./MainGraph";
import { useDispatch } from "react-redux";
import { API_KEY } from "../../secrets";
import { useEffect, useState } from "react";
import BlueBarLoader from "./BlueBarForDetailsOfCoin/BlueBarLoader";
import CoinDetailPricesLoader from "./CoinDetailHiLowPrices/CoinDetailPricesLoader";
import {setRank,setSymbol,setName,setPrice,setMarketCap,setVolume,setSupply,
  setWebsite,setIconUrl,setChange,setHigh,setLow,setAverage,setUUID} from "../../store/BlueBarAssets";


const AssetID = () => {
  const { assetIdentificator } = useParams();
  const timePeriod = "5y";
  const rangeSelectorEnabler = true;
  const [isDisplayLoader, setIsDisplayLoader] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    setIsDisplayLoader(true);
    fetch(`https://api.coinranking.com/v2/coin/${assetIdentificator}`, {
      method: "GET",
      headers: {
        "x-access-token": API_KEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const coin = data.data.coin;
        dispatch(setRank(coin.rank));
        dispatch(setUUID(coin.uuid));
        dispatch(setSymbol(coin.symbol));
        dispatch(setName(coin.name));
        const price = coin.price > 0.01 ? (Number(coin.price).toFixed(4)) : (Number(coin.price).toFixed(7))
        dispatch(setPrice(price));
        const marketCap =
          coin.marketCap > 1000000000
            ? `${(coin.marketCap / 1000000000).toFixed(3)}b`
            : `${(coin.marketCap / 1000000).toFixed(3)}m`;
        dispatch(setMarketCap(marketCap));
        const volume =
          coin["24hVolume"] > 1000000000
            ? `${(coin["24hVolume"] / 1000000000).toFixed(3)}b`
            : `${(coin["24hVolume"] / 1000000).toFixed(3)}m`;
        dispatch(setVolume(volume));
        const supply =
          coin.supply.total > 1000000000
            ? `${(coin.supply.total / 1000000000).toFixed(3)}b`
            : `${(coin.supply.total / 1000000).toFixed(3)}m`;
        dispatch(setSupply(supply));
        dispatch(setWebsite(coin.websiteUrl));
        dispatch(setIconUrl(coin.iconUrl));
        dispatch(setChange(coin.change));
        let max = Math.max(...coin.sparkline);
        max = max > 0.01 ? max.toFixed(4) : max.toFixed(7);
        dispatch(setHigh(max));
        let min = Math.min(...coin.sparkline);
        min = min > 0.01 ? min.toFixed(4) : min.toFixed(7);
        dispatch(setLow(min));
        const maxNum = Number(max);
        const minNum = Number(min);
        const average = ((maxNum + minNum) / 2) < 0.01 ? (((maxNum + minNum) / 2).toFixed(7)) : (((maxNum + minNum) / 2).toFixed(4));
        dispatch(setAverage(average));
        setIsDisplayLoader(false);
      })
      .catch((err) => navigate("*"));
  }, [assetIdentificator]);

  return (
    <div>
      {isDisplayLoader ? <BlueBarLoader /> : <BlueBarForDetailsOfCoin />}
      <div className="Assets-page">
        {isDisplayLoader ? <CoinDetailPricesLoader />: <CoinDetailHiLowPrices />}
        <MainGraph
          uuid={assetIdentificator}
          rangeSelectorEnabler={rangeSelectorEnabler}
          timePeriod={timePeriod}
        >
        </MainGraph>
      </div>
    </div>
  );
};
export default AssetID;
