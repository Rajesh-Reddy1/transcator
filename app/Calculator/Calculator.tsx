'use client'

import React, { useState } from "react";
import * as math from "mathjs";
import Home from "@/app/Home/page";
const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (val: string) => {
    setInput(input + val);
  };

  const handleEqual = () => {
    setInput(math.evaluate(input));
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="flex h-screen">
      <Home></Home>
      <div className="flex-grow">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Calculator</h1>
      </header>
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        <div className="row">
          <button className="btn gray" onClick={() => handleClick("7")}>
            7
          </button>
          <button className="btn gray" onClick={() => handleClick("8")}>
            8
          </button>
          <button className="btn gray" onClick={() => handleClick("9")}>
            9
          </button>
          <button className="btn orange" onClick={() => handleClick("/")}>
            ÷
          </button>
        </div>
        <div className="row">
          <button className="btn gray" onClick={() => handleClick("4")}>
            4
          </button>
          <button className="btn gray" onClick={() => handleClick("5")}>
            5
          </button>
          <button className="btn gray" onClick={() => handleClick("6")}>
            6
          </button>
          <button className="btn orange" onClick={() => handleClick("*")}>
            ×
          </button>
        </div>
        <div className="row">
          <button className="btn gray" onClick={() => handleClick("1")}>
            1
          </button>
          <button className="btn gray" onClick={() => handleClick("2")}>
            2
          </button>
          <button className="btn gray" onClick={() => handleClick("3")}>
            3
          </button>
          <button className="btn orange" onClick={() => handleClick("-")}>
            −
          </button>
        </div>
        <div className="row">
          <button className="btn gray" onClick={() => handleClick("0")}>
            0
          </button>
          <button className="btn gray" onClick={() => handleClick(".")}>
            .
          </button>
          <button className="btn orange" onClick={handleEqual}>
            =
          </button>
          <button className="btn orange" onClick={() => handleClick("+")}>
            +
          </button>
        </div>
        <div className="row">
          <button className="btn gray wide" onClick={handleClear}>
            AC
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Calculator;