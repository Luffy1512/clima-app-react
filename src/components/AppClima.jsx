import Formulario from "./Formulario"
import Resultado from "./Resultado"
import Spinner from "./Spinner"
import useClima from '../hook/useClima'

import location from '../img/location.svg'

const AppClima = () => {

    const {cargando, resultado, noResultado, obtenerGeo} = useClima()
    // console.log(Object.keys(resultado).length > 0);
    // console.log(noResultado.length > 0);

  return (
    <>
        <header>
            <h1>App del Clima</h1>
        </header>
    
        <main className="main">

            <div className="contenedor">
                <Formulario />
            </div>

            <div>
                <button 
                    type="button"
                    onClick={obtenerGeo}
                >
                    <img src={location} alt="Imagen Geo" />
                    Acceder a tu Geolocalización
                </button>
            </div>

            
                {cargando ? (
                <div className="contenedor spinner-grid">
                    <Spinner />
                </div>) :
                resultado?.name ? (
                <div className="spinner-grid">
                    <Resultado />
                </div>) : noResultado ? (
                    <p>{noResultado}</p>
                ) : (
                    <p>Aquí aparecera tu consulta del Clima</p>
                )
                }
                        
        </main>
    </>
  )
}

export default AppClima