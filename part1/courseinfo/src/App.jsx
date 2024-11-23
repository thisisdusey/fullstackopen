import { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <div>{props.text} :{props.value}</div>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) =>{
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="All" value={total} />
      <StatisticLine text="Average" value={average.toFixed(2)} />
      <StatisticLine text="Positive" value={`${positive.toFixed(2)} %`} />
    </div>
  );
};

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

  const total = (good+neutral+bad)
  const average = (good-bad)/total
  const positive = Number.isFinite(good / total)*100 ? good / total : 0

  return (
    <div>
      <h1>give Feedback</h1>
      <Button onClick={handleGoodClick}buttonName='good'/>
      <Button onClick={handleNeutralClick}buttonName='neutral'/>
      <Button onClick={handleBadClick}buttonName = 'bad'/>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
    )}

const Button = (props) =>{
  return(
    <button onClick={props.onClick}> {props.buttonName}</button>
  )
}



export default App