/* eslint-disable react/prop-types */
import { useState } from "react"
import { AddFriends } from "./AddFriends"
import { FriendList } from "./FriendList"
import { Notifications } from "./Notifications"
import '../css/MainScreen.css'

export const MainScreen = ({
    handleSalir
}) => {
    const [opcionElegida, setOpcionElegida] = useState(1);

    const cerrarSesion = () => {
        console.log('ENTRO A CERRAR SESION')
        handleSalir()
    }

  return (
    <> 
        <div className="barraNavegacion">
            <button className={`opcionMenu ${opcionElegida==1 && 'elegido'}`} onClick={() => {setOpcionElegida(1)}}>Chats</button>
            <button className={`opcionMenu ${opcionElegida==2 && 'elegido'}`} onClick={() => {setOpcionElegida(2)}}>Buscar</button>
            <button className={`opcionMenu ${opcionElegida==3 && 'elegido'}`} onClick={() => {setOpcionElegida(3)}}>Notificaciones</button>
        </div>
        <div className="contenedorMain">
            {opcionElegida == 1 &&(<FriendList/>)}
            {opcionElegida == 2 &&(<AddFriends/>)}
            {opcionElegida == 3 &&(<Notifications/>)}
        </div>
        <button className="cerrarSesion" onClick={()=>{cerrarSesion()}}>Cerrar Sesion</button>
    </>
  )
}