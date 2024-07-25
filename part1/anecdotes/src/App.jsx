import { useState } from 'react'

const Anecdote = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
      <p>{props.anecdote}</p>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.hizoClick}>{props.text}</button>
    </>
  )
}

const Votos = (props) => {
  return (
    <>
      <p>has {props.anecdote} votes</p>
    </>
  )
}

const MostVotes = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
      <p>{props.mayor}</p>
      <p>has {props.cantidad} votes</p>
    </>
  )
}

const App = () => {
  const title = "Anecdote of the day"
  const subtitle = "Anecdote with most votes"
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votos, setVotos] = useState(new Uint8Array(8))

  const cambio = () => {
    let num = Math.floor(Math.random() * 8)
    setSelected(num)
  }

  const votar = () => {
    const copia = [...votos]
    copia[selected] += 1
    setVotos(copia)
  }
  return (
    <div>
      <Anecdote text={title} anecdote={anecdotes[selected]}/>
      <Votos anecdote={votos[selected]}/>
      <Button hizoClick={() => votar()} text="vote"/>
      <Button hizoClick={() => cambio()} text="next anecdote"/>
      <MostVotes text={subtitle} cantidad={Math.max(...votos)} mayor={anecdotes[votos.indexOf(Math.max(...votos))]}/>
    </div>
  )
}

export default App
