const Content = (props) => {
        return (
      <>
        {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </>
    )
}

const Part = (props) => {
    return (
      <>
        <p>{props.name} {props.exercises}</p>
      </>
    )
}

export default Content