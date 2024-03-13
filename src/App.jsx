import './App.css'
import Button from './Components/Button';
import { useReducer } from 'react'

function App() {
const initialState = {
  displayValue: '0',
  operator: null,
  prevValue: null,
  waitingForOperand: false,
};

function reducer(state, action) {
  switch(action.type) {
    case 'inputDigit':
      return {
        ...state,
        displayValue:
        state.displayValue === '0' || state.waitingForOperand ? String(action.digit) : state.displayValue + action.digit,
        waitingForOperand: false,
      };
    case 'inputOperator':
      return {
        ...state,
        operator: action.operator,
        prevValue: state.displayValue,
        waitingForOperand: true,
      };
    case 'calculateResult':
      const { operator, prevValue, displayValue } = state;
      const prev = parseFloat(prevValue);
      const next = parseFloat(displayValue);
      let result = 0;
      switch(operator) {
        case '+':
          result = prev + next;
          break;
        case '-':
          result = prev - next;
          break;
        case 'X':
          result = prev * next;
          break;
        default:
          return state;
      }
      return {
        displayValue: String(result),
        operator: null,
        prevValue: null,
        waitingForOperand: true,
      };
      default:
        return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

const handleDigitClick = (digit) => {
  dispatch({ type: 'inputDigit', digit});
};

const handleOperatorClick = (operator) => {
  dispatch({ type: 'inputOperator', operator});
};

const handleEqualsClick = () => {
  dispatch({ type: 'calculateResult'})
}



return (
  <div>
    <input type="text" value={state.displayValue} readOnly />
    <div className="keypad">
      {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((item, index) => (
        <Button buttonText={item} key={index} handleClick={() => handleDigitClick(item)}/>
      ))}
      <Button handleClick={() => handleOperatorClick('+')} buttonText="+" />
      <Button handleClick={() => handleOperatorClick('-')} buttonText="-" />
      <Button handleClick={() => handleOperatorClick('X')} buttonText="X" />
      <Button handleClick={() => handleEqualsClick()} buttonText="=" />
    </div>
  </div>
);
}

export default App
