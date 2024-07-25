const Total = (props) => {
    return (
      <>
        <p><b>Number of exercises {props.parts.reduce((acumulador, valorActual) => acumulador + valorActual.exercises, 0)}</b></p>
      </>
    )
}

export default Total