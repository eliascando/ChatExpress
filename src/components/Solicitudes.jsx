/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { obtenerNotificaciones, atenderSolicitud } from '../services/Usuarios';
import { Notificacion } from './Modal';
import '../css/Solicitudes.css';

export const Solicitudes = ({ sesionActiva }) => {
  const { idUsuario } = sesionActiva;
  const [notificaciones, setNotificaciones] = useState([]);
  const [showNotificacion, setShowNotificacion] = useState(false);

  useEffect(() => {
    obtenerNotificaciones(idUsuario)
      .then(data => setNotificaciones(data))
      .catch(error => console.error('Error al obtener las notificaciones:', error));
  }, [showNotificacion]);

  const handleAceptar = (idResponse, idRequest) => {
    atenderSolicitud(idResponse, idRequest, 'ACCEPT')
      .then(data => {
        setShowNotificacion(true);
        console.log(data)
        // Realizar las acciones necesarias después de aceptar la solicitud
      })
      .catch(error => console.error('Error al aceptar la solicitud:', error));
  };

  const handleRechazar = (idResponse, idRequest) => {
    atenderSolicitud(idResponse, idRequest, 'DECLINE')
      .then(data => {
        setShowNotificacion(true);
        console.log(data)
        // Realizar las acciones necesarias después de rechazar la solicitud
      })
      .catch(error => console.error('Error al rechazar la solicitud:', error));
  };

  return (
    <div className="contenedorNotificaciones">
      {notificaciones.length > 0 ? (
        <ul className='listaSolicitudes'>
          {notificaciones.map((notificacion, index) => (
            <li className='solicitud' key={index}>
              <div className='datosPersona'>
                <img
                  className='imagenPersona'
                  src={notificacion.imagen === '' ? '../../public/user_default.svg' : notificacion.imagen}
                  alt="Imagen de perfil"
                />
                <div className="nombrePersona">{notificacion.usuario}</div>
              </div>
              <div className='botones'>
                <button className='aceptar' onClick={() => handleAceptar(idUsuario, notificacion.id)}>Aceptar</button>
                <button className='rechazar' onClick={() => handleRechazar(idUsuario, notificacion.id)}>Rechazar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay solicitudes de amistad pendientes.</p>
      )}
      {showNotificacion && (
        <Notificacion message="La solicitud ha sido procesada." />
      )}
    </div>
  );
};
