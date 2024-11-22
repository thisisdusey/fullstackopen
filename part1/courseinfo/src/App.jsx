import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick =()=>{
    setGood(good+1)
  }

  const handleNeutralClick =()=>{
    setNeutral(neutral+1)
  }

  const handleBadClick =()=>{
    setBad(bad+1)
  }


  return (
    <div>
      <h1>give Feedback</h1>
      <Button onClick={handleGoodClick}buttonName='good'/>
      <Button onClick={handleNeutralClick}buttonName='neutral'/>
      <Button onClick={handleBadClick}buttonName = 'bad'/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const Button = (props) =>{
  return(
    <button onClick={props.onClick}> {props.buttonName}</button>
  )
}

export default App