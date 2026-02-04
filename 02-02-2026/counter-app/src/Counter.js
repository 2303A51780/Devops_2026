import React, { useState } from "react";

function Counter() {
  // 1️⃣ Initialize state
  const [count, setCount] = useState(0);
  const [message,setMessage] = useState("");

  // 2️⃣ Handler functions
  const increment = () => {
    const newCount = count+1;
    setCount(newCount);

    if(newCount === 5){
      setMessage("You have Reached 5!")
    }
  };

  const decrement = () => {
    if(count>0){
      setCount(count -1);
      setMessage("");
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter Application</h2>
      <h1>{count}</h1>
      {message && <p style={{color:"Purple"}}>{message}</p>}

      <button onClick={increment} style={{backgroundColor:"blue",height:50,}}>Increment + </button>
      <button onClick={decrement} style={{ margin: "0 10px",backgroundColor:"green",height:50}} >
        Decrement -
      </button>
      <button onClick={reset} style={{backgroundColor:"red",height:50}}>Reset</button>
    </div>
  );
}

export default Counter;