const Person = (props) => {
    return (
        <p>{props.nombre} {props.numero}</p>
    )
}

const Persons = (props) => {
    return (
        <div>
            {props.filtrado.map(person => <Person key={person.name} nombre={person.name} numero={person.number}/>)}
        </div>
    )
}

export default Persons