import React, { useState, useEffect } from "react";
import "./SelectSearchComponent.css";
import Select from "react-select";
import { API_KEY } from "../../../secrets";
import {setFirstChosenCoinPrice, setSecondChosenCoinPrice} from "../../../store/SwapSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SelectSearchComponent = ({changeCoinIcon, changeMyBalance, changeRateCoin, setChosenCoinPrice}) => {
  
  const dispatch = useDispatch();
  const rateFirstCoin = useSelector((state) => state.swaper.rateFirstCoin);
  const rateSecondCoin = useSelector((state) => state.swaper.rateSecondCoin);
  const [makeRequest, setMakeRequest] = useState(false);
  const [mySwapOptions, setMySwapOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.coinranking.com/v2/coins?limit=100", {
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
        const allCoins = data.data.coins;
        if (rateFirstCoin.length > 0 && rateSecondCoin.length > 0) {
          const priceOfFirstCoin = allCoins.find((coin) => coin.symbol === rateFirstCoin).price;
          const priceOfSecondCoin = allCoins.find((coin) => coin.symbol === rateSecondCoin).price;
          dispatch(setFirstChosenCoinPrice(Number(priceOfFirstCoin)));
          dispatch(setSecondChosenCoinPrice(Number(priceOfSecondCoin)));
        }
        const updatedOptions = [];
        for (let i = 0; i < allCoins.length; i++) {
          updatedOptions.push({
            value: allCoins[i].name,
            label: allCoins[i].symbol,
            price: allCoins[i].price,
            rank: allCoins[i].rank,
            iconUrl: allCoins[i].iconUrl,
          });
          setMySwapOptions(updatedOptions);
        }
        setMakeRequest(false);
      })
      .catch((err) => navigate("*"));
  }, [makeRequest]);

  useEffect(() => {
    setInterval(() => {
      setMakeRequest(true);
    }, 10000);
  }, []);

  return (
    <div className="select-search-box">
      <div style={{ margin: "0 auto", maxWidth: 200 }}>
        <Select
          className="select-search"
          options={mySwapOptions}
          onChange={(e) => {
            changeCoinIcon(e.iconUrl);
            let currentCoin = e.label;
            changeMyBalance(JSON.parse(localStorage.getItem("activeUser"))?.myBalance[currentCoin]?.toFixed(5) || 0);
            changeRateCoin(e.label);
            setChosenCoinPrice(Number(e.price));
          }}
        />
      </div>
    </div>
  );
};
export default SelectSearchComponent;
