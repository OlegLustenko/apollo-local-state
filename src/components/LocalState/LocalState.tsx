import React from "react";

type LocalStateComponentProps = {
  increment: () => void;
  decrement: () => void;
  counter: number;
};

export const LocalStateComponent = ({
  increment,
  decrement,
  counter
}: LocalStateComponentProps) => {
  return (
    <div>
      <button onClick={increment}>INCREMENT</button>
      COUNTER {counter}
      <button onClick={decrement}>INCREMENT ODD</button>
    </div>
  );
};
