/* eslint-disable react/prop-types */
import '../css/FriendList.css';
import { useEffect, useState } from 'react';
import { obtenerListaAmigos } from '../services/Usuarios';
import { Chat } from './Chat';
import { DEFAULT_USER } from '../services/constants';

export const FriendList = ({ sesionActiva }) => {
  const [amigos, setAmigos] = useState([]);
  const [amigoElegido, setAmigoElegido] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [chat, setChat] = useState({});
  const { idUsuario, nombreUsuario } = sesionActiva;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerListaAmigos(idUsuario);
        setAmigos(data);
        setCargando(false);
      } catch (error) {
        console.error(error);
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
      {cargando ? (
        <p className="loading">Cargando chats...</p>
      ) : (
        <>
          {!amigoElegido ? (
            <div className="contenedorAmigos">
              {amigos.length > 0 ? (
                <ul className="listaAmigos">
                  {amigos.map((amigo) => (
                    <li className="amigo" key={amigo.id}>
                      <div
                        onClick={() => handleChatearAmigo(amigo)}
                        className="chatearAmigo"
                      >
                        <img
                          className="imagenAmigo"
                          src={
                            amigo.imagen === ''
                              ? DEFAULT_USER
                              : amigo.imagen
                          }
                          alt="Imagen de perfil"
                        />
                        <div className="nombreAmigo">{amigo.usuario}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="emptyContent">No hay amigos que mostrar.</p>
              )}
            </div>
          ) : (
            <Chat
              nombreUsuario={nombreUsuario}
              amigo={chat}
              setAmigoElegido={setAmigoElegido}
            />
          )}
        </>
      )}
    </>
  );
};
