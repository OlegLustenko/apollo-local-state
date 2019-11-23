import React from "react";

type LocalStateComponentProps = {
  increment: () => void;
  decrement: () => void;
  incrementOddHandler: () => void;
  counter: number;
};

export const LocalStateComponent = ({
  increment,
  decrement,
  incrementOddHandler,
  counter
}: LocalStateComponentProps) => {
  return (
    <div>
      <button onClick={increment}>INCREMENT</button>
      COUNTER {counter}
      <button onClick={decrement}>DECREMENT</button>
      <div>
        <button onClick={incrementOddHandler}>INCREMENT ODD</button>
      </div>
    </div>
  );
};
