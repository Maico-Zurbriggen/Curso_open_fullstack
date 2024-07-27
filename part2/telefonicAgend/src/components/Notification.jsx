const Notification = ({ mensaje, tipo }) => {
    if (mensaje === null) {
      return null
    }
  
    return (
      <div className={`alerta ${tipo}`}>
        {mensaje}
      </div>
    )
}

export default Notification