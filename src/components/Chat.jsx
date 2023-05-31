import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Chat = ({
  socket,
  isConnected,
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
      console.log('se envia un mensaje')
      setNuevoMensaje('');
    }
  };

  const recibirMensaje = (message) => {
    console.log('llega un mensaje')
    setMensajes((mensajes) => [...mensajes, message]);
    console.log(message);
    console.log(socket)
  };

  useEffect(() => {

    socket.on('chat_message', recibirMensaje);
    
    console.log(socket)
  
    if (isConnected === null) {
      setMensajeEstado('CONECTANDO...');
    } else if (isConnected) {
      setMensajeEstado(`CONECTADO (${nombreUsuario})`);
    } else if (!isConnected) {
      setMensajeEstado('NO ESTÁ CONECTADO');
    }

    return () => {
      socket.off('connection');
      socket.off('chat_message',recibirMensaje);
    };
  },[]);

  
  useEffect(() => {
    console.log('se ejecuta el use efect de guardar mensajes y mostrar el bottom')
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
          {mensajes.map((mensaje, index) => (
            <li className={`message ${mensaje.usuario !== nombreUsuario ? 'remitente' : 'emisor'}`} key={index}>
            {mensaje.usuario}: {mensaje.mensaje}
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
      <button className='botonSalir' onClick={handleSalir}>
        Cerrar Sesión
      </button>
    </div>
  );
};

Chat.propTypes = {
  socket: PropTypes.object,
  isConnected: PropTypes.bool,
  nombreUsuario: PropTypes.string,
  handleSalir: PropTypes.func,
  room: PropTypes.string
};

export { Chat };