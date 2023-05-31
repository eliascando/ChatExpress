import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ULMensajes, LiMensaje } from '../components/Mensajes';
import { ChooseRoom } from './ChooseRoom';

const Chat = ({
  isConnected,
  nombreUsuario,
  socket,
  handleSalir,
  choosedRoom,
  setChoosedRoom,
  room,
  setRoom
}) => {
    const [mensajeEstado, setMensajeEstado] = useState('');
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState(() => {
        const mensajesGuardados = localStorage.getItem('mensajes');
        return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
      });
    const socketRef = useRef();
    const cajaMensajesRef = useRef(null);
 
  const enviarMensaje = () => {
    if (nuevoMensaje !== '') {
      socketRef.current = socket.emit('chat_message', {
        room: room,
        message: {
            usuario: nombreUsuario,
            mensaje: nuevoMensaje,
        }
      });
      setNuevoMensaje('');
    }
  };

    useEffect(() => {
        const handleChatMessage = (message) => {
            setMensajes((mensajes) => [...mensajes, message]);
            console.log(message);
        };

        socketRef.current = socket.on('chat_message', handleChatMessage);

        return () => {
        socket.off('chat_message', handleChatMessage);
        };
    }, [socket,socketRef,setMensajes]);
  
  useEffect(()=> {
    if(isConnected == null){
        setMensajeEstado ('CONECTANDO...')
    }else if(isConnected){
        setMensajeEstado(`CONECTADO (${nombreUsuario})`)
    }else if(!isConnected){
        setMensajeEstado('NO ESTÁ CONECTADO')
    }
  }, [isConnected]);

  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    if (cajaMensajesRef.current) {
        cajaMensajesRef.current.scrollTop = cajaMensajesRef.current.scrollHeight;
      }
  }, [mensajes]);

  return (
    <>
        {!choosedRoom &&(
        <ChooseRoom
            setRoom = {setRoom}
            setChoosedRoom = {setChoosedRoom}
            socket = {socket}
            nombreUsuario={nombreUsuario}
        />
    )}
    {choosedRoom && room && (
        <div className='App'>
        <h1>{room}</h1>
        <h2>{mensajeEstado}</h2>
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
    )}
    </>
  );
};

Chat.propTypes = {
  isConnected: PropTypes.bool,
  nombreUsuario: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
  handleSalir: PropTypes.func.isRequired,
  choosedRoom: PropTypes.bool,
  setChoosedRoom: PropTypes.func,
  room: PropTypes.string,
  setRoom: PropTypes.func
};

export { Chat };