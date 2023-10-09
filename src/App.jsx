import { useState, useEffect } from "react";
import Dice from "./components/Dice.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  function setArray() {
    return new Array(10).fill(1).map((val) => {
      return {
        value: Math.round(Math.random() * (6 - 1) + 1),
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  const [diceNum, setDiceNum] = useState(() => setArray());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeldCondition = diceNum.every((diceObj) => {
      return diceObj.isHeld;
    });
    const refObj = diceNum[0].value;

    const sameValue = diceNum.every((diceObj) => diceObj.value === refObj);
    if (allHeldCondition && sameValue) {
      console.log(true);
      setTenzies(true);
    }
  }, [diceNum]);

  useEffect(() => {
    setDiceNum(setArray());
  }, [tenzies]);

  function handleClickRoll(condition) {
    if (condition) setTenzies(false);
    setDiceNum((prevDiceNum) =>
      prevDiceNum.map((diceObj) => {
        if (diceObj.isHeld) {
          return diceObj;
        } else {
          return { ...diceObj, value: Math.round(Math.random() * (6 - 1) + 1) };
        }
      })
    );
  }

  function handleClickDice(id) {
    setDiceNum((prevDiceArr) => {
      //  console.log("clicked");
      return prevDiceArr.map((diceObj) => {
        if (diceObj.id === id) {
          return {
            ...diceObj,
            isHeld: !diceObj.isHeld,
          };
        } else {
          return diceObj;
        }
      });
    });
  }

  return (
    <>
      <div className="board container mx-auto my-auto d-flex justify-content-center align-items-center flex-column">
        <h2>Tenzies</h2>
        <p className="text-center">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {diceNum.map((diceObj, index) => (
            <Dice
              key={diceObj.id}
              value={diceObj.value}
              handleClickDice={() => handleClickDice(diceObj.id)}
              hold={diceObj.isHeld}
            />
          ))}
        </div>
        <button
          onClick={() => handleClickRoll(tenzies)}
          className="btn btn-primary fw-bold mt-5"
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
        {tenzies && <Confetti />}
      </div>
    </>
  );
}

export default App;
