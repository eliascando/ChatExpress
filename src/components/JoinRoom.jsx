/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Chat } from "./Chat";
import { io } from 'socket.io-client';
import { WEBSOCKET_URL } from "../services/constants";

const socket = io(WEBSOCKET_URL);

const JoinRoom = ({
    room,
    setRoom,
    choosedRoom,
    setChoosedRoom,
    nombreUsuario,
    handleSalir
}) => {
    
    const [capturarSala, setCapturarSala] = useState('');
    const [isConnected, setIsConnected] = useState(null);

    useEffect(()=>{
        socket.on('connect', () => {
            setIsConnected(true);
        });
    },[socket])

    const handleIngresarSala = () =>{
        if(capturarSala !== ''){
            setChoosedRoom(true)
            setRoom(capturarSala)
            socket.emit('join_room',{ 
                room: capturarSala, 
                user: nombreUsuario
            });
            localStorage.setItem('sala', JSON.stringify(capturarSala));
            localStorage.setItem('sala-activa',true)
        }else{
            setChoosedRoom(false)
        }
    }
    return(
        <>
            {!choosedRoom &&(
                <div>
                    <h1 className="tituloIngresarSala">Ingrese el nombre de la sala:</h1>
                    <input
                        className="ingresarSala"
                        type="text"
                        placeholder="Ingrese..."
                        onChange={(e) => setCapturarSala(e.target.value)}
                    ></input>
                    <button onClick={() => handleIngresarSala()}
                    >Ingresar</button>
                </div>
            )}
            {choosedRoom && room && (
                <Chat
                    socket={socket}
                    isConnected={isConnected}
                    setIsConnected={setIsConnected}
                    nombreUsuario={nombreUsuario}
                    handleSalir={handleSalir}
                    room={room}
                />
            )}
        </>
    )
}

export {JoinRoom};