import React, { useState } from "react";

const GridLight = () => {
  const config = [
    [1, 1, 0],
    [0, 1, 1],
    [1, 0, 1],
  ];

  const [stack, setStack] = useState(new Map());

  function handleClick(rowIndex, colIndex) {
    return () => {
      const newStack = structuredClone(stack);
      const key = `${rowIndex}-${colIndex}`;
      if (newStack.get(key) || !config[rowIndex][colIndex]) {
        return;
      } else {
        newStack.set(key, true);
      }
      setStack(newStack);
      const lightsSelected = config.flat().reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      if (lightsSelected === newStack.size) {
        startRollBack();
      }
    };
  }

  function startRollBack() {
    const intervalId = setInterval(function () {
      setStack((prevStack) => {
        const lastKey = Array.from(prevStack.keys()).pop();
        const newStack = structuredClone(prevStack);
        newStack.delete(lastKey);
        if (!newStack.size) {
          clearInterval(intervalId);
        }
        return newStack;
      });
    }, 1000);
  }

  return (
    <div className="grid-light">
      {config.map((row, rowIndex) => {
        return (
          <div
            className="grid-row"
            key={rowIndex}
          >
            {row.map((value, colIndex) => {
              let lightClass = "";
              if (value === 0) {
                lightClass = "off";
              }
              const key = `${rowIndex}-${colIndex}`;
              if (stack.get(key)) {
                lightClass += " on";
              }
              return (
                <div
                  className={`light ${lightClass}`}
                  onClick={handleClick(rowIndex, colIndex)}
                  key={colIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridLight;
