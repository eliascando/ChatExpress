/* eslint-disable react/prop-types */
import { useState } from "react"
import { AddFriends } from "./AddFriends"
import { FriendList } from "./FriendList"
import { Solicitudes } from "./Solicitudes"
import '../css/MainScreen.css'

export const MainScreen = ({
    handleSalir,
    sesionActiva
}) => {
    const [opcionElegida, setOpcionElegida] = useState(1);

    const cerrarSesion = () => {
        handleSalir()
    }

  return (
    <> 
        <div className="barraNavegacion">
            <button className={`opcionMenu ${opcionElegida==1 && 'elegido'}`} onClick={() => {setOpcionElegida(1)}}>Chats</button>
            <button className={`opcionMenu ${opcionElegida==2 && 'elegido'}`} onClick={() => {setOpcionElegida(2)}}>Buscar</button>
            <button className={`opcionMenu ${opcionElegida==3 && 'elegido'}`} onClick={() => {setOpcionElegida(3)}}>Solicitudes</button>
        </div>
        <div className="contenedorMain">
            {opcionElegida == 1 &&(<FriendList sesionActiva={sesionActiva}/>)}
            {opcionElegida == 2 &&(<AddFriends sesionActiva={sesionActiva}/>)}
            {opcionElegida == 3 &&(<Solicitudes sesionActiva={sesionActiva}/>)}
        </div>
        <div className="barraInformacion">
            <p className="nombreUsuario">{sesionActiva.nombreUsuario}</p>
            <button className="cerrarSesion" onClick={()=>{cerrarSesion()}}>Cerrar Sesion</button>
        </div>
    </>
  )
}