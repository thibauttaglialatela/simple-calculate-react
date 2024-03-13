import { useReducer } from "react";
import "./App.css";
import Button from "./Components/Button";

function App() {
  const initialState = {
    displayValue: "0",
    operator: null,
    prevValue: null,
    waitingForOperand: false,
    errorMessage: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'reset':
        return {
          ...initialState,
        };
      case "inputDigit":
        return {
          ...state,
          displayValue: state.waitingForOperand
            ? String(action.digit)
            : state.displayValue === "0"
            ? String(action.digit)
            : state.displayValue + action.digit,
          waitingForOperand: false,
        };
      case "inputOperator":
        if (state.operator && !state.waitingForOperand) {
          return {
            ...state,
            prevValue: state.displayValue,
            displayValue: String(state.prevValue),
            waitingForOperand: true,
          };
        }
        return {
          ...state,
          operator: action.operator,
          prevValue: state.displayValue,
          waitingForOperand: true,
          errorMessage: "",
        };
      case "calculateResult":
        const { operator, prevValue, displayValue, errorMessage } = state;
        const prev = parseFloat(prevValue);
        const next = parseFloat(displayValue);
        let result = 0;
        switch (operator) {
          case "+":
            result = prev + next;
            break;
          case "-":
            result = prev - next;
            break;
          case "X":
            result = prev * next;
            break;
          case "/":
            if (next === 0) {
              return {
                ...state,
                errorMessage: "La division par zéro est interdite",
              };
            }
            result = prev / next;
            break;
          default:
            return state;
        }
        return {
          displayValue: String(result),
          operator: null,
          prevValue: result,
          waitingForOperand: true,
          errorMessage: "",
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDigitClick = (digit) => {
    dispatch({ type: "inputDigit", digit });
  };

  const handleOperatorClick = (operator) => {
    dispatch({ type: "inputOperator", operator });
  };

  const handleEqualsClick = () => {
    dispatch({ type: "calculateResult" });
  };

  const handleReset = () => {
    dispatch({ type: 'reset'});
  };

  return (
    <div>
      <input type="text" value={state.displayValue} readOnly />
      <div className="keypad">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((item, index) => (
          <Button
            buttonText={item}
            key={index}
            handleClick={() => handleDigitClick(item)}
          />
        ))}
        <Button handleClick={() => handleOperatorClick("+")} buttonText="+" />
        <Button handleClick={() => handleOperatorClick("-")} buttonText="-" />
        <Button handleClick={() => handleOperatorClick("X")} buttonText="X" />
        <Button handleClick={() => handleOperatorClick("/")} buttonText="/" />
        <Button handleClick={() => handleEqualsClick()} buttonText="=" />
        <Button handleClick={() => handleReset()} buttonText="reset" />
      </div>
      {
        state.errorMessage && <p>{state.errorMessage}</p>
      }
    </div>
  );
}

export default App;
