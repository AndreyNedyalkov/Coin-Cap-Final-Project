import React from "react";
import "./InputAmountForSwap.css";
import { useState } from "react";
import { useEffect } from "react";

export default function InputAmountForSwap({calculatedValue, setNumberToCalc, setFinalNumberToSwap, cleaner}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(calculatedValue);
    setFinalNumberToSwap(calculatedValue);
  }, [calculatedValue]);

  useEffect(() => {
    setInputValue("");
  }, [cleaner]);

  return (
    <input
      onChange={(e) => {
        let value = e.target.value;
        if (value >= 0) {
          setInputValue(value);
          setNumberToCalc(Number(value));
          setFinalNumberToSwap(Number(value));
        } else {
          setInputValue("");
        }
      }}
      inputMode="decimal"
      minLength="1"
      maxLength="79"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      pattern="^[0-9]*[.,]?[0-9]*$"
      type="number"
      placeholder="0"
      className="Currency-input-styled-input"
      value={inputValue}
    ></input>
  );
}
