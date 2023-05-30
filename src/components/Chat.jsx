import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ULMensajes, LiMensaje } from '../components/Mensajes';

const Chat = ({
  isConnected,
  nombreUsuario,
  cajaMensajesRef,
  mensajes,
  setMensajes,
  nuevoMensaje,
  setNuevoMensaje,
  socket,
  handleSalir
}) => {

  const enviarMensaje = () => {
    if (nuevoMensaje !== '') {
      socket.emit('chat_message', {
        usuario: nombreUsuario,
        mensaje: nuevoMensaje,
      });
      setNuevoMensaje('');
    }
  };

  useEffect(() => {
    const handleChatMessage = (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    };

    socket.on('chat_message', handleChatMessage);

    return () => {
      socket.off('chat_message', handleChatMessage);
    };
  }, [socket, setMensajes]);

  return (
    <div className='App'>
      <h2>
        {isConnected === null
        ? 'CONECTANDO...'
        : isConnected
        ? `CONECTADO (${nombreUsuario})`
        : 'NO ESTÁ CONECTADO'}
      </h2>
      <div className='cajaMensajes' ref={cajaMensajesRef}>
        <ULMensajes className='mensajes'>
          {mensajes.map((mensaje, index) => (
            <LiMensaje key={index}>
              {mensaje.usuario}: {mensaje.mensaje}
            </LiMensaje>
          ))}
        </ULMensajes>
      </div>
      <div className='controlMensaje'>
        <input
          className='mensaje'
          type='text'
          name='mensaje'
          value={nuevoMensaje}
          autoComplete='off'
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
  isConnected: PropTypes.bool,
  nombreUsuario: PropTypes.string.isRequired,
  cajaMensajesRef: PropTypes.object.isRequired,
  mensajes: PropTypes.array.isRequired,
  setMensajes: PropTypes.func.isRequired,
  nuevoMensaje: PropTypes.string.isRequired,
  setNuevoMensaje: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  handleSalir: PropTypes.func.isRequired
};

export { Chat };
