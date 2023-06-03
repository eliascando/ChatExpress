/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from 'react';

const Chat = ({
  socket,
  isConnected,
  setIsConnected,
  nombreUsuario,
  handleSalir,
  room
}) => {  
    const [mensajeEstado, setMensajeEstado] = useState('');
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState(() => {
        const mensajesGuardados = localStorage.getItem('mensajes');
        return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
    });
    const cajaMensajesRef = useRef(null);
 
  const enviarMensaje = () => {
    if (nuevoMensaje !== '') {
      socket.emit('chat_message', {
        room: room,
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
      room: room
    }));
    handleSalir()
  }
  useEffect(() => {
    socket.emit('join_room',{ 
      room: room, 
      user: nombreUsuario
    });

    setIsConnected(true)

    socket.on('chat_message', recibirMensaje);

    return () => {
      socket.off('connection');
      socket.off('chat_message',recibirMensaje);
    };
  },[]);

  useEffect(()=>{
    if (isConnected === null) {
      setMensajeEstado('CONECTANDO...');
    } else if (isConnected) {
      setMensajeEstado(`CONECTADO (${nombreUsuario})`);
    } else if (!isConnected) {
      setMensajeEstado('NO ESTÁ CONECTADO');
    }
  },[isConnected])

  
  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    if (cajaMensajesRef.current) {
      cajaMensajesRef.current.scrollTop = cajaMensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className='App'>
      <h1>{room}</h1>
      <h2>{mensajeEstado}</h2>
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
      <button className='botonSalir' onClick={()=>{desconectarse()}}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export { Chat };