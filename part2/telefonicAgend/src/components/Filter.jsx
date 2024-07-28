const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.valor} onChange={props.controlador}/>
        </div>
    )
}

export default Filter