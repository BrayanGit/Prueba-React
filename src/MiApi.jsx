import { useState, useEffect } from "react";
import Carta from "./Carta";
import './MiApi.css';

const MiApi = () => {

  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  useEffect(() => {
    obtenerData();
  }, []);

  const obtenerData = async () => {
    const url = 'https://restcountries.com/v3.1/all';
    const respuesta = await fetch(url);
    const paises = await respuesta.json();
  
    const datosPaises = paises.map((pais) => {
      return {
        nombre: pais.name.common,
        nombreIngles: pais.name.official,
        codigo: pais.cca2
      };
    });
    // se cambia el orden 
    setDatos(datosPaises.reverse());
  };

  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
              <label htmlFor="Busqueda"><strong>Busqueda APIs con React</strong></label>
            </div>
            <div className="d-flex align-items-center">
              <input 
                type="text" 
                id="busqueda"
                placeholder="Ingrese busqueda"
                className="form-control"
                onChange={(e) => {
                  setBusqueda(e.target.value)
                }}
                value={busqueda}
              />
            </div>
        </div>
      </nav>
      
      <div className="contenedor-cartas">
        <div className="col" style={{ overflow: 'auto', maxHeight: '500px' }}>
          {
            datos
              .filter((item) => {
                if (item.nombre.toLowerCase().includes(busqueda.toLowerCase())
                    || item.nombreIngles.toLowerCase().includes(busqueda.toLowerCase())
                    || item.codigo.toLowerCase().includes(busqueda.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              .map((item) => {
                return <Carta key={item.codigo} contenido={item.nombre + ' (' + item.nombreIngles + ') - ' + item.codigo} />
              })
          }
        </div>
      </div>
      <br />
      <footer><strong>@Lista de países con React</strong></footer>
      <hr />
      <br />
    </>
  );
}

export default MiApi;

