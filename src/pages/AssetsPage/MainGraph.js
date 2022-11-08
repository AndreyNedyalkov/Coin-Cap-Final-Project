import React from "react";
import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { API_KEY } from "../../secrets";
import { useNavigate } from "react-router-dom";

function MainGraph(props) {
  const navigate = useNavigate();
  const symbol = useSelector((state) => state.blueBarAssets.symbol);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`https://api.coinranking.com/v2/coin/${props.uuid}/history?timePeriod=${props.timePeriod}`,
      {
        method: "GET",
        headers: {
          "x-access-token": API_KEY,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
          throw new Error("Someting went wrong")
      })
      .then((data) => {
        setHistory(data.data.history);
      })
      .catch((err) => navigate("*"))
      .catch(error => {navigate("/*")})
  }, [props.uuid]);

  let data = [];
  for (const key of history) {
    let coinStats = [key.timestamp * 1000, Number(key.price)];
    data.unshift(coinStats);
  }

  const options = {
    time: {
      useUTC: false,
    },
    rangeSelector: {
      enabled: props.rangeSelectorEnabler,
      allButtonsEnabled: true,
      inputEnabled: false,
      buttons: [
        {
          type: "day",
          count: 7,
          text: "7d",
        },
        {
          type: "day",
          count: 30,
          text: "30d",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "year",
          count: 3,
          text: "3y",
        },
        {
          type: "year",
          count: 5,
          text: "5y",
        },
        {
          type: "ytd",
          text: "YTD",
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },
    chart: {
      backgroundColor: "white",
      type: "area",
    },
    title: {
      text: symbol,
      align: "center",
    },
    series: [
      {
        name: symbol,
        data: data,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <div id="container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
}

export default MainGraph;
