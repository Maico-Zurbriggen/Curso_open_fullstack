const PersonForm = (props) => {
    return (
        <form onSubmit={props.controladorForm}>
            <div>
                name: <input value={props.estadoName} onChange={props.controladorName} placeholder="three characters minimum"/>
            </div>
            <div>
                number: <input value={props.estadoNum} onChange={props.controladorNum} placeholder="12-12345.. 123-1234.."/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm