/* eslint-disable react/prop-types */
import { ImageUploader } from "./ImageUploader";
import '../css/Settings.css';
import { BACK_ICON } from "../services/constants";

export const Settings = ({setOpcionElegida, sesionActiva, setSesionActiva}) => {
  return (
    <div className='contenedorAjustes'>
        <ImageUploader sesionActiva={sesionActiva} setSesionActiva={setSesionActiva}/>
        <div className="contenedorAjustesDatos">
            <button className="cambiarContraseña">Cambiar Contraseña</button>
            <button className="actualizarDatos">Actualizar Datos</button>
            <button className='botonVolver' onClick={()=>{setOpcionElegida(1)}}>
                <img className='backIcon' src={BACK_ICON}/>
            </button>
        </div>
    </div>
  )
}