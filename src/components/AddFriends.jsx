/* eslint-disable react/prop-types */
import '../css/AddFriends.css';
import { useEffect, useState } from 'react';
import { obtenerUsuarios, enviarSolicitud } from '../services/Usuarios';
import { Notificacion } from './Modal';

export const AddFriends = ({ sesionActiva }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notificacionMessage, setNotificacionMessage] = useState('');
  const {idUsuario} = sesionActiva;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerUsuarios(idUsuario);
        setUsuarios(data);
        setCargando(false);
      } catch (error) {
        setCargando(false);
      }
    };

    fetchData();
  }, [showModal]);

  useEffect(() => {
    if (filtro === '') {
      setUsuariosFiltrados(usuarios);
    } else {
      const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.usuario.toLowerCase().includes(filtro.toLowerCase())
      );
      setUsuariosFiltrados(usuariosFiltrados);
    }
  }, [filtro, usuarios]);

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleEnviarSolicitud = (idReq) => {
    enviarSolicitud(idUsuario, idReq)
      .then( () => {
        setNotificacionMessage('Solicitud enviada con éxito!');
        setShowModal(true);

      })
      .catch(error => {
        console.log('Error al enviar la solicitud: ', error);
      });
  };

  return (
    <>
      <div className="contenedorPersonas">
        <input
          type='text'
          placeholder='Buscar persona'
          className='buscarPersona'
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
        <ul className="listaPersonas">
          {cargando ? (
            <p className='loading'>Cargando usuarios...</p>
          ) : usuariosFiltrados.length === 0 ? (
            <p className='noUsuarios'>No hay usuarios para mostrar.</p>
          ) : (
            usuariosFiltrados.map(usuario => (
              <li className="persona" key={usuario.id}>
                <div className='personaContent'>
                  <img className='imagenPersona' src={usuario.imagen === '' ? '../../src/assets/user_default.svg' : usuario.imagen} alt="Imagen de perfil" />
                  <div className="nombrePersona">{usuario.usuario}</div>
                </div>
                <button className='añadirAmigo' onClick={() => {handleEnviarSolicitud(usuario.id)}}>Añadir Amigo</button>
              </li>
            ))
          )}
        </ul>
      </div>
      {showModal && (
        <Notificacion message={notificacionMessage} onClose={handleCloseModal} />
      )}
    </>
  );
  
};
