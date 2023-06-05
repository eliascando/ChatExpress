/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import '../css/Chat.css'
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { BACK_ICON, DEFAULT_USER, WEBSOCKET_URL } from "../services/constants";

const socket = io(WEBSOCKET_URL);

const Chat = ({
  nombreUsuario,
  amigo,
  setAmigoElegido
}) => {  
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState('');
    const [estadoConexion, setEstadoConexion] = useState({ conectado: false, usuario: '' });
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
          mensaje: nuevoMensaje
        }
      });
      setNuevoMensaje('');
    }
  };

  const recibirMensaje = (message) => {
    setMensajes((mensajes) => [...mensajes, message]);
  };

  const desconectarse = () => {
    socket.emit('exit_room', {
      user: nombreUsuario,
      idRoom: idRoom
    });
    setAmigoElegido(false);
    setEstadoConexion({ conectado: false, usuario: '' });
    localStorage.removeItem('mensajes');
  };

  useEffect(() => {
    socket.on('connect', () => {
    });

    socket.emit('join_room',{ 
      room: idRoom,
      user: nombreUsuario
    });
    socket.on('chat_message', recibirMensaje);

    socket.on('user_connected', (data) => {
      const { connected, user } = data;
      setEstadoConexion({ conectado: connected, usuario: user });
    });

    socket.on('user_disconnected', (data) => {
      const { connected, user } = data;
      setEstadoConexion({ conectado: connected, usuario: user });
    });

    if(imagen == ''){
      setImagenPerfil(DEFAULT_USER)
    }else{
      setImagenPerfil(imagen)
    }
    return () => {
      socket.emit('exit_room',({
        user : nombreUsuario, 
        room : idRoom
      }));
      socket.off('connection');
      socket.off('chat_message', recibirMensaje);
      socket.off('user_connected');
      socket.off('user_disconnected');
    };
  },[]);
  
  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    if (cajaMensajesRef.current) {
      cajaMensajesRef.current.scrollTop = cajaMensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className='contenedorChat'>
      <div className='informacionUsuario'>
        <button className='Volver' onClick={()=>{desconectarse()}}>
          <img className='backIconChat' src={BACK_ICON}/>
        </button>
        <img className='imagenAmigo' src={imagenPerfil}/>
        <h1 className='nombreAmigo'>{usuario}</h1>
        <div className={`estadoUsuario ${estadoConexion.conectado && 'conectado'}`}></div>
      </div>
      <div className='cajaMensajes' ref={cajaMensajesRef}>
        <ul className='mensajes'>
        {mensajes.slice().reverse().map((mensaje, index) => (
          <li className={`message ${mensaje.usuario !== nombreUsuario ? 'remitente' : 'emisor'}`} key={index}>
            <div className="content">
              {mensaje.mensaje}
            </div>
          </li>
        ))}
        </ul>
      </div>
      <div className='controlMensaje'>
        <input
          className='escribirMensaje'
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
        <button onClick={enviarMensaje} className='enviarMensaje'>
          Enviar
        </button>
      </div>
    </div>
  );
};

export { Chat };