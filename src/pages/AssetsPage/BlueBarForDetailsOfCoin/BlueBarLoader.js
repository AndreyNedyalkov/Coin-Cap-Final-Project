import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/LoaderComponent";

export default function BlueBarLoader() {
  const website = useSelector((state) => state.blueBarAssets.website);

  return (
    <div className="ui raised attached very padded segment asset-header">
      <div className="ui container stackable two column grid">
        <div className="seven wide column">
          <div className="ui three column grid">
            <div className="four wide column">
              <div className="Flag__Container-h2lle0-0 bihKRl">
                <h1>
                  <Loader  sizing={25} />
                </h1>
                <p>RANK</p>
              </div>
            </div>
            <div className="top aligned twelve wide column">
              <h1 className="ui header">
                <Loader  sizing={25} />
              </h1>
              <h2
                style={{
                  display: "inline-block",
                  margin: "0px",
                  verticalAlign: "bottom",
                }}
              >
                <span className="Numeral__Container-sc-18j7kzw-0 jbOTGs numeral ">
                  <Loader  sizing={25} />
                </span>
              </h2>
              <h3
                style={{
                  display: "inline-block",
                  marginLeft: "16px",
                  marginTop: "0px",
                  verticalAlign: "bottom",
                }}
              ></h3>
            </div>
          </div>
        </div>
        <div className="nine wide column">
          <div className="ui doubling three column grid">
            <div className="row">
              <div className="column">
                <div className="ui medium header">
                  <div className="sub header">Market Cap </div>
                  <span className="Numeral__Container-sc-18j7kzw-0 jbOTGs numeral ">
                    <Loader  sizing={25} />
                  </span>
                </div>
              </div>
              <div className="column">
                <div className="ui medium header">
                  <div className="sub header">Volume (24Hr) </div>
                  <span className="Numeral__Container-sc-18j7kzw-0 jbOTGs numeral ">
                    <Loader  sizing={25} />
                  </span>
                </div>
              </div>
              <div className="column">
                <div className="ui medium header">
                  <div className="sub header">Supply </div>
                  <span className="Numeral__Container-sc-18j7kzw-0 jbOTGs numeral ">
                    <Loader  sizing={25} />
                  </span>{" "}
                  <Loader  sizing={25} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <a
                  href={website}
                  target="_blank"
                  className="ui circular primary button"
                  role="button"
                >
                  Website{" "}
                </a>
              </div>
              <div className="column">
                <a
                  href="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                  target="_blank"
                  className="ui circular primary button"
                  role="button"
                >
                  Explorer{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
