import React from "react";
export default function Dice({ value, handleClickDice, hold }) {
  return (
    <div
      className={`dice ${hold ? "hold" : ""} fs-3`}
      onClick={handleClickDice}
    >
      {value}
    </div>
  );
}
