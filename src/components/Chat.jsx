/* eslint-disable react/prop-types */
import '../css/Chat.css'
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { WEBSOCKET_URL } from "../services/constants";

const socket = io(WEBSOCKET_URL);

const Chat = ({
  nombreUsuario,
  amigo,
  setAmigoElegido
}) => {  
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState('');

    const [mensajes, setMensajes] = useState(() => {
        const mensajesGuardados = localStorage.getItem('mensajes');
        return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
    });
    const cajaMensajesRef = useRef(null);

    const { usuario, imagen, idRoom} = amigo;

  const enviarMensaje = () => {
    if (nuevoMensaje !== '') {
      socket.emit('chat_message', {
        room: idRoom,
        message: {
          usuario: nombreUsuario,
          mensaje: nuevoMensaje,
        }
      });
      setNuevoMensaje('');
    }
  };

  const recibirMensaje = (message) => {
    setMensajes((mensajes) => [...mensajes, message]);
  };

  const desconectarse = () => {
    socket.emit('exit_room',({
      user : nombreUsuario, 
      idRoom: idRoom
    }));
    setAmigoElegido(false);
    localStorage.removeItem('mensajes')
  }

  useEffect(() => {
    socket.on('connect');

    socket.emit('join_room',{ 
      room: idRoom,
      user: nombreUsuario
    });

    socket.on('chat_message', recibirMensaje);
    
    if(imagen == ''){
      setImagenPerfil('../../public/user_default.svg')
    }else{
      setImagenPerfil(imagen)
    }
    return () => {
      socket.off('connection');
      socket.off('chat_message',recibirMensaje);
    };
  },[amigo]);
  
  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    if (cajaMensajesRef.current) {
      cajaMensajesRef.current.scrollTop = cajaMensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className='contenedorChat'>
      <div className='informacionUsuario'>
        <button className='botonVolver' onClick={()=>{desconectarse()}}>
          <img src='../../public/back-icon.svg'/>
        </button>
        <img className='imagenAmigo' src={imagenPerfil}/>
        <h1 className='nombreAmigo'>{usuario}</h1>
      </div>
      <div className='cajaMensajes' ref={cajaMensajesRef}>
        <ul className='mensajes'>
        {mensajes.slice().reverse().map((mensaje, index) => (
          <li className={`message ${mensaje.usuario !== nombreUsuario ? 'remitente' : 'emisor'}`} key={index}>
            <div className="content">
              {mensaje.usuario} : {mensaje.mensaje}
            </div>
          </li>
        ))}
        </ul>
      </div>
      <div className='controlMensaje'>
        <input
          className='mensaje'
          type='text'
          name='mensaje'
          value={nuevoMensaje}
          autoComplete='off'
          placeholder='Escriba un mensaje...'
          onChange={(e) => setNuevoMensaje(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Return') {
              enviarMensaje();
            }
          }}
        />
        <button onClick={enviarMensaje} className='enviarButton'>
          Enviar
        </button>
      </div>
    </div>
  );
};

export { Chat };