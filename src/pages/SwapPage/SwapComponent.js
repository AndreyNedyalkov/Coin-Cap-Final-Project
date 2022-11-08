import React from "react";
import "./SwapComponent.css";
import shuffle from "../../components/Icons/shuffle.svg";
import { useState, useEffect } from "react";
import SelectSearchComponent from "./SelectSearchComponent/SelectSearchComponent";
import InputAmountForSwap from "./InputOnlyNumberForSwap/InputAmountForSwap";
import ConnectWalletModal from "../../components/Header/ConnectWallet/ConnectWalletModal";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { setMyPortfolioBalance } from "../../store/PortfolioSlice";
import {
  setFirstCoinIconUrl,
  setSecondCoinIconUrl,
  setMyBalance,
  setRateFirstCoin,
  setRateSecondCoin,
  setFirstChosenCoinPrice,
  setSecondChosenCoinPrice,
  setRate,
} from "../../store/SwapSlice";


export default function SwapComponent() {
  const isLogin = useSelector((state) => state.disabler.isLogin);
  const firstCoinIcon = useSelector((state) => state.swaper.firstCoinIconUrl);
  const secondCoinIcon = useSelector((state) => state.swaper.secondCoinIconUrl);
  const myBalance = useSelector((state) => state.swaper.myBalance);
  const rateFirstCoin = useSelector((state) => state.swaper.rateFirstCoin);
  const rateSecondCoin = useSelector((state) => state.swaper.rateSecondCoin);
  const firstChosenCoinPrice = useSelector((state) => state.swaper.firstChosenCoinPrice);
  const secondChosenCoinPrice = useSelector((state) => state.swaper.secondChosenCoinPrice);
  const rate = useSelector((state) => state.swaper.rate);

  const [rateDisplayd, setRateDisplayd] = useState("hidden");
  const [firstCalculatedValue, setFirstCalculatedValue] = useState("");
  const [secondCalculatedValue, setSecondCalculatedValue] = useState("");
  const [numberToCalc1, setNumberToCalc1] = useState(0);
  const [numberToCalc2, setNumberToCalc2] = useState(0);
  const [firstFinalNumberToSwap, setFirstFinalNumberToSwap] = useState(0);
  const [secondFinalNumberToSwap, setSecondFinalNumberToSwap] = useState(0);
  const [displayWarning, setDisplayWarning] = useState("none");
  const [displayDenied, setDisplayDenied] = useState("none");
  const [displaySuccess, setDisplaySuccess] = useState("none");
  const [cleaner, setCleaner] = useState(false);

  const dispatch = useDispatch();
 
  useEffect(() => {
    if (rateFirstCoin.length > 0 && rateSecondCoin.length > 0) {
      setRateDisplayd("visible");
      dispatch(setRate(firstChosenCoinPrice / secondChosenCoinPrice));
    }
  }, [firstChosenCoinPrice, secondChosenCoinPrice]);

  useEffect(() => {
    if (rateFirstCoin.length > 0 && rateSecondCoin.length > 0) {
      setSecondCalculatedValue((numberToCalc1 * (firstChosenCoinPrice / secondChosenCoinPrice)).toFixed(5));
    }
    if (numberToCalc1 === 0) {
      setSecondCalculatedValue("");
    }
  }, [numberToCalc1, firstChosenCoinPrice, secondChosenCoinPrice]);

  useEffect(() => {
    if (rateFirstCoin.length > 0 && rateSecondCoin.length > 0) {
      setFirstCalculatedValue((numberToCalc2 /(firstChosenCoinPrice / secondChosenCoinPrice)).toFixed(5));
    }
    if (numberToCalc2 === 0) {
      setFirstCalculatedValue("");
    }
  }, [numberToCalc2]);

  const swap = () => {
    if (rateFirstCoin.length > 0 && rateSecondCoin.length > 0 && firstFinalNumberToSwap > 0 && secondFinalNumberToSwap > 0) {
      const thisUser = JSON.parse(localStorage.getItem("activeUser"));
      const sellCoins = Number(firstFinalNumberToSwap);
      const getCoins = Number(secondFinalNumberToSwap);
      if (thisUser.myBalance[rateFirstCoin] >= sellCoins) {
        setDisplayDenied("none");
        setDisplayWarning("none");
        setDisplaySuccess("block");
        setTimeout(() => {
          setDisplaySuccess("none");
        }, 4500);
        thisUser.myBalance[rateFirstCoin] = thisUser.myBalance[rateFirstCoin] - sellCoins;
        if (thisUser.myBalance[rateSecondCoin]) {
          thisUser.myBalance[rateSecondCoin] = thisUser.myBalance[rateSecondCoin] + getCoins;
        } else {
          thisUser.myBalance[rateSecondCoin] = getCoins;
        }
      } else {
        setDisplayDenied("block");
        setDisplayWarning("none");
        setDisplaySuccess("none");
        setTimeout(() => {
          setDisplayDenied("none");
        }, 5000);
      }
      dispatch(setMyPortfolioBalance(thisUser.myBalance));
      localStorage.setItem("activeUser", JSON.stringify(thisUser));
      const updatedUsers = JSON.parse(localStorage.getItem("users"));
      updatedUsers.map((user) => {
        if (user.id === thisUser.id) {
          user.myBalance = thisUser.myBalance;
        }
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      dispatch(setMyBalance(thisUser.myBalance[rateFirstCoin].toFixed(5)));
    } else {
      setDisplayDenied("none");
      setDisplayWarning("block");
      setDisplaySuccess("none");
      setTimeout(() => {
        setDisplayWarning("none");
      }, 5000);
    }

    setFirstCalculatedValue("");
    setSecondCalculatedValue("");
    setNumberToCalc1(0);
    setNumberToCalc2(0);
    setFirstFinalNumberToSwap(0);
    setSecondFinalNumberToSwap(0);
    setCleaner(!cleaner);
  };

  return (
    <div className="Swap-component">
      <div className="Swap-component-header">
        <h3>Swap</h3>
      </div>
      <div className="Swap-component-body">
        <div className="Currency-input">
          <div className="Currency-input-title">
            <label>You Sell</label>
            <label>
              Your balance: {myBalance} {rateFirstCoin}
            </label>
          </div>
          <div className="Currency-input-currency-input-row">
            <InputAmountForSwap
              calculatedValue={firstCalculatedValue}
              setNumberToCalc={setNumberToCalc1}
              setFinalNumberToSwap={setFirstFinalNumberToSwap}
              cleaner={cleaner}
            />
            <span className="Currency-select-btn-inner">
              <img
                src={firstCoinIcon}
                className="Currency-select-btn-token-icon"
              ></img>
              <SelectSearchComponent
                changeCoinIcon={(url) => dispatch(setFirstCoinIconUrl(url))}
                changeMyBalance={(balance) => dispatch(setMyBalance(balance))}
                changeRateCoin={(symbol) => dispatch(setRateFirstCoin(symbol))}
                setChosenCoinPrice={(price) =>
                  dispatch(setFirstChosenCoinPrice(price))
                }
              />
            </span>
          </div>
        </div>

        <div className="Swapper-center-row">
          <img src={shuffle} className="Swapper-styled-icon"></img>
          <h4 style={{ visibility: rateDisplayd }} className="rateH4">
            1<p>{rateFirstCoin}</p> = {rate.toFixed(5)}
            <p>{rateSecondCoin}</p>
          </h4>
        </div>

        <div className="Currency-input">
          <div className="Currency-input-title">
            <label>You Get</label>
          </div>
          <div className="Currency-input-currency-input-row">
            <InputAmountForSwap
              calculatedValue={secondCalculatedValue}
              setNumberToCalc={setNumberToCalc2}
              setFinalNumberToSwap={setSecondFinalNumberToSwap}
              cleaner={cleaner}
            />
            <span className="Currency-select-btn-inner">
              <img
                src={secondCoinIcon}
                className="Currency-select-btn-token-icon"
              ></img>

              <SelectSearchComponent
                changeCoinIcon={(url) => dispatch(setSecondCoinIconUrl(url))}
                changeMyBalance={() => dispatch(setMyBalance(myBalance))}
                changeRateCoin={(symbol) => dispatch(setRateSecondCoin(symbol))}
                setChosenCoinPrice={(price) =>
                  dispatch(setSecondChosenCoinPrice(price))
                }
              />
            </span>
          </div>
        </div>
        <div className="Swap-result-message">
          <p style={{ display: displayWarning, color: "#FC6600" }}>
            Please select a currency and enter the amount!
          </p>
          <p style={{ display: displayDenied, color: "red" }}>
            Denied!!! There are not enough funds available!
          </p>
          <p style={{ display: displaySuccess, color: "green" }}>
            Successfully!
          </p>
        </div>
        <div className="Swap-button-container">
          {!isLogin ? (
            <ConnectWalletModal />
          ) : (
            <Button
              className="Swap-button"
              onClick={() => {
                swap();
              }}
              style={{
                borderRadius: 40,
                backgroundColor: "rgb(24, 198, 131)",
                padding: "7px 16px",
                fontSize: "20px",
                boxShadow: "rgb(0 0 0 / 40%) 0px 2px 15px -3px",
                minWidth: "250px",
              }}
              variant="contained"
            >
              Swap now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
