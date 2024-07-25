import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Statistics = (props) => {
  if (props.datos[3] == 0){
    return (
      <>
        <h1>{props.name}</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>{props.name}</h1>
      <table>
        <tbody> 
          <StatisticLine text="good" datos={props.datos[0]}/>
          <StatisticLine text="neutral" datos={props.datos[1]}/>
          <StatisticLine text="bad" datos={props.datos[2]}/>
          <StatisticLine text="all" datos={props.datos[3]}/>
          <StatisticLine text="average" datos={props.datos[4]}/>
          <StatisticLine text="positive" datos={props.datos[5]}/>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = (props) => {
  if (props.text == "positive"){
    return (
      <tr>
        <th>{props.text}</th><td>{props.datos}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <th>{props.text}</th><td>{props.datos}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.hizoClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  const title = "give feedback"
  const subtitle = "statistics"
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const setBuena = () => {
    setGood(good+1)
    setAll(all+1)
    setAverage((good+1)-(bad))
    setPositive((good+1)*100/(all+1))
  }

  const setMedia = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    setAverage((good)-(bad))
    setPositive((good)*100/(all+1))
  }

  const setMala = () => {
    setBad(bad+1)
    setAll(all+1)
    setAverage((good)-(bad+1))
    setPositive((good)*100/(all+1))
  }

  return (
    <div>
      <Header name={title}/>
      <Button hizoClick={() => setBuena()} text={"good"}/>
      <Button hizoClick={() => setMedia()} text={"neutral"}/>
      <Button hizoClick={() => setMala()} text={"bad"}/>
      <Statistics name={subtitle} datos={[good, neutral, bad, all, average, positive]}/>
    </div>
  )
}

export default App