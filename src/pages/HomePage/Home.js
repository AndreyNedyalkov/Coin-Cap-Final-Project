import React, { useState } from "react";
import BlueBarAdaptive from "./BlueBarUnderHeader/BlueBarAdaptive";
import "./Home.css";
import MainTable from "./TableComponent/TableComponent";
import getCoins from "../../AxiosHooks/getCoins";
import axios from "../../apis/coinranking";
import MainGreenButton from "../../components/MainGreenButton";
import { addToFetchSlice } from "../../store/FetchSlice";
import { useDispatch} from "react-redux";
import { OLD_KEY } from "../../secrets";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  let [initLimitCoins, setInitLimitCoins] = useState(20);

  function FetchCoins() {
    const coinsLimit = 20;
    const [coins, error, loading] = getCoins({
      axiosInstance: axios,
      method: `GET`,
      url: `coins?`,
      requestConfig: {
        params: {
          limit: coinsLimit,
          timePeriod: "24h",
          orderBy: "marketCap",
          orderDirection: "desc",
          offset: "0",
          referenceCurrencyUuid: "yhjMzLPhuIDl",
        },
      },
    });

    return [coins, error, loading];
  }

  function handleData() {
    setInitLimitCoins(initLimitCoins += 20)
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': OLD_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=${initLimitCoins}&offset=0`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Someting went wrong");
        }
        return response.json()})
      .then(response => {
        let getNeededData = response.data.coins.map((coin) => {
          if (coin.price) {
            coin.price = +coin.price;
          }
          if (coin.marketCap) {
            coin.marketCap = +coin.marketCap;
          }
          if (coin.change) {
            coin.change = +coin.change;
          }
          return coin;
        });
        dispatch(addToFetchSlice(getNeededData));
      }
        )
      .catch(err => {navigate("*")});
  }

  return (
    <>
      <BlueBarAdaptive />
      <div className="MainWrapper">
        <MainTable FetchCoins={FetchCoins} />
      </div>
      <div className="MainGreenButton">
      <MainGreenButton  text={"Load More"} function={handleData}>
      </MainGreenButton>
      </div>
    </>
  );
}
