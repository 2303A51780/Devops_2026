import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [operator, setOperator] = useState(null);
  const [resetNext, setResetNext] = useState(false);

  // ---- Number input ----
  const inputNumber = useCallback((num) => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === "0" || resetNext) {
        setResetNext(false);
        return num;
      }
      return prevDisplay + num;
    });
  }, [resetNext]);

  // ---- Operator input ----
  const inputOperator = useCallback((op) => {
    setPrev(Number(display));
    setOperator(op);
    setResetNext(true);
  }, [display]);

  // ---- Calculation ----
  const calculate = useCallback(() => {
    if (prev === null || operator === null) return;

    const current = Number(display);
    let result;

    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = current === 0 ? "Error" : prev / current;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setPrev(null);
    setOperator(null);
    setResetNext(true);
  }, [display, prev, operator]);

  // ---- Clear ----
  const clear = useCallback(() => {
    setDisplay("0");
    setPrev(null);
    setOperator(null);
    setResetNext(false);
  }, []);

  // ---- Keyboard support ----
  useEffect(() => {
    const handleKey = (e) => {
      if (!isNaN(e.key)) inputNumber(e.key);
      if (["+","-","*","/"].includes(e.key)) inputOperator(e.key);
      if (e.key === "Enter") calculate();
      if (e.key === "Backspace") {
        setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
      }
      if (e.key === "Escape") clear();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [inputNumber, inputOperator, calculate, clear]);

  return (
    <div className="calculator">
      <div className="display">{display}</div>

      <div className="buttons">
        <button className="btn-num" onClick={() => inputNumber("7")}>7</button>
        <button className="btn-num" onClick={() => inputNumber("8")}>8</button>
        <button className="btn-num" onClick={() => inputNumber("9")}>9</button>
        <button className="btn-op" onClick={() => inputOperator("/")}>÷</button>

        <button className="btn-num" onClick={() => inputNumber("4")}>4</button>
        <button className="btn-num" onClick={() => inputNumber("5")}>5</button>
        <button className="btn-num" onClick={() => inputNumber("6")}>6</button>
        <button className="btn-op" onClick={() => inputOperator("*")}>×</button>

        <button className="btn-num" onClick={() => inputNumber("1")}>1</button>
        <button className="btn-num" onClick={() => inputNumber("2")}>2</button>
        <button className="btn-num" onClick={() => inputNumber("3")}>3</button>
        <button className="btn-op" onClick={() => inputOperator("-")}>−</button>

        <button className="btn-num" onClick={() => inputNumber("0")}>0</button>
        <button className="btn-equal" onClick={calculate}>=</button>
        <button className="btn-op" onClick={() => inputOperator("+")}>+</button>

        <button className="btn-clear" onClick={clear}>Clear</button>
      </div>
    </div>
  );
}

export default Calculator;
