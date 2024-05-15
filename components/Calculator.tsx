import React, { useState } from "react";
import * as math from "mathjs";


const ClearButton: React.FC<{ handleClear: () => void }> = ({
  handleClear,
}) => (
  <button className="clear" onClick={handleClear}>
    Clear
  </button>
);

const Input: React.FC<{ input: string }> = ({ input }) => (
  <div className="input">{input}</div>
);

interface ButtonProps {
  handleClick: (val: string) => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, children }) => (
  <button onClick={() => handleClick(children)}>{children}</button>
);

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (val: string) => {
    setInput(input + val);
  };

  const handleEqual = () => {
    setInput(math.evaluate(input));
  };

  const handleClear = () => {
    setInput("0");
  };

  return (
    <div className="Calculator">
      <div className="calc-wrapper">
        <Input input={input} />
        <div className="row">
          <Button handleClick={handleClick}>7</Button>
          <Button handleClick={handleClick}>8</Button>
          <Button handleClick={handleClick}>9</Button>
          <Button handleClick={handleClick}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={handleClick}>4</Button>
          <Button handleClick={handleClick}>5</Button>
          <Button handleClick={handleClick}>6</Button>
          <Button handleClick={handleClick}>*</Button>
        </div>
        <div className="row">
          <Button handleClick={handleClick}>1</Button>
          <Button handleClick={handleClick}>2</Button>
          <Button handleClick={handleClick}>3</Button>
          <Button handleClick={handleClick}>-</Button>
        </div>
        <div className="row">
          <Button handleClick={handleClick}>.</Button>
          <Button handleClick={handleClick}>0</Button>
          <Button handleClick={handleEqual}>=</Button>
          <Button handleClick={handleClick}>+</Button>
        </div>
        <ClearButton handleClear={handleClear} />
      </div>
    </div>
  );
};

export default Calculator;
