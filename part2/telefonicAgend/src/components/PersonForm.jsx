const PersonForm = (props) => {
    return (
        <form onSubmit={props.controladorForm}>
            <div>
                name: <input value={props.estadoName} onChange={props.controladorName}/>
            </div>
            <div>
                number: <input value={props.estadoNum} onChange={props.controladorNum}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm