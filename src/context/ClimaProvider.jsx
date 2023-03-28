import { createContext, useState, useEffect } from 'react'

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {

    const [resultado, setResultado] = useState({})
    const [noResultado, setNoResultado] = useState('')
    const [cargando, setCargando] = useState(false)
    const [busqueda, useBusqueda] = useState({
        ciudad: '',
        pais: ''
   })

   const obtenerGeo = () => {
    navigator.geolocation.getCurrentPosition(e => geolocalizacion(e))
   }

   const geolocalizacion = async e => {
    // console.log(e);
    const {latitude, longitude} = e.coords
    setResultado({})
    setCargando(true)
    try {
        const appID = import.meta.env.VITE_API_KEY
        const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appID}`
        // console.log(urlClima);

        const respuestaClima = await fetch(urlClima)
        const resultadoClima = await respuestaClima.json()
        // console.log(resultadoClima);
        setResultado(resultadoClima)

    } catch (error) {
        console.log(error);
        setNoResultado('Ciudad no encontrada')
    } finally {
        setCargando(false)
        useBusqueda({
            ciudad: '',
            pais: ''
       })
    }
   }
   

    const datosBusqueda = e => {
        useBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        }) 
    }

    const obtenerClima = async (datos) => {

        // console.log(datos);
        setResultado({})
        setCargando(true)
        try {
            const appID = import.meta.env.VITE_API_KEY

            const {ciudad, pais} = datos
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            console.log(resultado);
            const {lat, lon} = resultado.coord
            
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`
            // console.log(urlClima);

            const respuestaClima = await fetch(urlClima)
            const resultadoClima = await respuestaClima.json()
            // console.log(resultadoClima);
            setResultado(resultadoClima)

        } catch (error) {
            console.log(error);
            setNoResultado('Ciudad no encontrada')
        } finally {
            setCargando(false)
            useBusqueda({
                ciudad: '',
                pais: ''
           })
        }
    }
    
    return (
        <ClimaContext.Provider
            value={{
                resultado,
                cargando,
                obtenerClima,
                busqueda,
                datosBusqueda,
                noResultado,
                obtenerGeo
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}
export default ClimaContext