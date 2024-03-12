import './App.css'
import './Components/Input'
import Input from './Components/Input'
import Button from './Components/Button'
import { useReducer } from 'react'

function App() {

  const initialState = {number: 0};

  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return {}
        break;
    
      default:
        return state;
    }
  }

  return (
    <>
      <h1>Une calculatrice trés simple</h1>
      <div className="card">
        <h2><span>Résultat : </span></h2>
        <Input label="1" />
        <Input label="2" />
        <div>
          <Button buttonText="+"/>
          <Button buttonText="-"/>
          <Button buttonText="reset"/>
        </div>
      </div>
    </>
  )
}

export default App
