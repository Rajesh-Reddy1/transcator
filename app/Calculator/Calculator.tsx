"use client";
import React, { useState } from "react";
import * as math from "mathjs";
import Home from "@/app/Home/page";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (val: any) => {
    setInput(input + val);
  };

  const handleEqual = () => {
    setInput(math.evaluate(input));
  };

  const handleClear = () => {
    setInput("");
  };
  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Home />
      <div className="flex-grow">
        <header className="bg-gray-900 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Calculator</h1>
        </header>
        <div className="calculator mx-auto sm:w-1/2 lg:w-1/4 xl:w-1/5">
          <div className="display">{input}</div>
          <div className="buttons grid grid-cols-4 gap-4 p-4">
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
                <button className="btn gray col-span-1" onClick={handleClear}>
                  AC
                </button>
                <button
                  className="btn gray col-span-1"
                  onClick={handleBackspace}
                >
                  ⌫
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

