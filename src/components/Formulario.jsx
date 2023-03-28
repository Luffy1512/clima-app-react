import { Fragment, useState } from 'react'
import { PAISES } from '../constants'
import useClima from '../hook/useClima'


const Formulario = () => {

    const [alerta, setAlerta] = useState('')

    const { obtenerClima, busqueda, datosBusqueda } = useClima()

    const handleSubmit = e => {
        e.preventDefault()

        if (Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son obligatorios');
            return;
        }

        obtenerClima(busqueda)
    }

  return (
    <form
        onSubmit={handleSubmit}
    >
        {alerta}
        <div className="formulario__contenedor">
            <div className="campo">
                <label htmlFor="ciudad">Ciudad</label>
                <input 
                    type="text" 
                    id="ciudad" 
                    name='ciudad'
                    onChange={e => datosBusqueda(e)} 
                    value={busqueda.ciudad}
                />
            </div>

            <div className="campo">
                <label htmlFor="pais">País</label>
                <select 
                    name="pais" 
                    id="pais"
                    onChange={e => datosBusqueda(e)} 
                    value={busqueda.pais}
                >
                    <option value="">-- Seleccione un país --</option>
                    
                    {PAISES.map(pais => (
                        <Fragment key={pais.id}>
                        <option value={pais.id}>{pais.nombre}</option>
                        </Fragment>
                    ))}
                    
                </select>
            </div>
        </div>

        <input type="submit" value='Consultar Clima' />
    </form>
  )
}

export default Formulario