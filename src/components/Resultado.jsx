import useClima from '../hook/useClima'

const Resultado = () => {

    const { resultado } = useClima()
    // console.log(resultado);
    const {name, main, weather, sys} = resultado

    // Grados Kelvin
    const kelvin = 273.15

    // Formatear Fecha
    const formatearFecha = () => {
      const fechaNueva = new Date()
      const opciones = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
      }

      return fechaNueva.toLocaleDateString('es-ES', opciones)
    }
  return (
    <div className='clima'>
        <p className='fecha'>{formatearFecha()}</p>
        <h2>El Clima de {name} - {sys.country} es:</h2>

        <div className="clima__info">
          <p>Hora Actual: <span>{new Date().getHours()}:{new Date().getMinutes()}</span></p>
          <p>El cielo esta: <span>{weather[0].description}</span> </p>
        </div>
        
        <div className="clima__actual">
          <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="imagen" />
          <p>{ parseInt(main.temp - kelvin)} <span>&#x2103;</span></p> 
        </div>
        
        <div className='clima__min-max'>
            <p>Min.: { parseInt(main.temp_min - kelvin)} <span>&#x2103;</span></p>
            <p>Max.: { parseInt(main.temp_max - kelvin)} <span>&#x2103;</span></p>
        </div>
    </div>
  )
}

export default Resultado