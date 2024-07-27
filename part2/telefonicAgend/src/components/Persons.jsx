const Person = (props) => {
    return (
        <>
            <p>{props.nombre} {props.numero} <button onClick={props.eliminar}>delete</button></p>
        </>
    )
}

export default Person