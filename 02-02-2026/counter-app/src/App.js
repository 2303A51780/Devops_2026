import React, { useState } from "react";
import Counter from "./Counter";
import Calculator from "./Calculator";

function App() {
  const [showCalculator, setShowCalculator] = useState(true);

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => setShowCalculator(true)}>Calculator</button>
      <button onClick={() => setShowCalculator(false)} style={{ marginLeft: "10px" }}>
        Counter
      </button>

      {showCalculator ? <Calculator /> : <Counter />}
    </div>
  );
}

export default App;
