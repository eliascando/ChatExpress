/* eslint-disable react/prop-types */
import '../css/FriendList.css';
import { useEffect, useState } from 'react';
import { obtenerListaAmigos } from '../services/Usuarios';
import { Chat } from './Chat';

export const FriendList = ({ sesionActiva }) => {
  const [amigos, setAmigos] = useState([]);
  const [amigoElegido, setAmigoElegido] = useState(false);
  const [chat, setChat] = useState({});
  const { idUsuario, nombreUsuario } = sesionActiva;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerListaAmigos(idUsuario);
        setAmigos(data);
      } catch (error) {
        console.error('Error al obtener la lista de amigos:', error);
      }
    };

    fetchData();
  }, [idUsuario]);

  const handleChatearAmigo = (amigo) => {
    setChat(amigo);
    setAmigoElegido(true);
  };

  return (
    <>
      {!amigoElegido && (
        <div className="contenedorAmigos">
          {amigos.length > 0 ? (
            <ul className="listaAmigos">
              {amigos.map(amigo => (
                <li className="amigo" key={amigo.id}>
                  <div
                    onClick={() => handleChatearAmigo(amigo)}
                    className='chatearAmigo'
                  >
                    <img
                      className='imagenAmigo'
                      src={amigo.imagen === '' ? '../../public/user_default.svg' : amigo.imagen}
                      alt="Imagen de perfil"
                    />
                    <div className='nombreAmigo'>{amigo.usuario}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
              <p>No hay amigos que mostrar.</p>
            )}
        </div>
      )}
      {amigoElegido && (
        <Chat
          nombreUsuario={nombreUsuario}
          amigo={chat}
          setAmigoElegido={setAmigoElegido}
        />
      )}
    </>
  );
};
