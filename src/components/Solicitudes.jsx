/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { obtenerNotificaciones, atenderSolicitud } from '../services/Usuarios';
import { Notificacion } from './Modal';
import '../css/Solicitudes.css';
import { DEFAULT_USER } from '../services/constants';

export const Solicitudes = ({ sesionActiva }) => {
  const { idUsuario } = sesionActiva;
  const [notificaciones, setNotificaciones] = useState([]);
  const [showNotificacion, setShowNotificacion] = useState(false);
  const [messageNotification, setMessageNotification] = useState('');

  useEffect(() => {
    obtenerNotificaciones(idUsuario)
      .then(data => setNotificaciones(data))
      .catch(error => console.error(error));
  }, [showNotificacion]);

  const handleSolicitud = (idResponse, idRequest, response) => {
    setMessageNotification(()=>{
      if(response == 'ACCEPT') return 'Haz aceptado la solicitud!'
      if(response == 'DECLINE')return 'Haz rechazado la solicitud!'
    })
    atenderSolicitud(idResponse, idRequest,response )
      .then(() => {
        setShowNotificacion(true);
      })
      .catch(error => console.error(error));
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
                  src={notificacion.imagen === '' ? DEFAULT_USER : notificacion.imagen}
                  alt="Imagen de perfil"
                />
                <div className="nombrePersona">{notificacion.usuario}</div>
              </div>
              <div className='botones'>
                <button className='aceptar' onClick={() => handleSolicitud(idUsuario, notificacion.id, 'ACCEPT')}>Aceptar</button>
                <button className='rechazar' onClick={() => handleSolicitud(idUsuario, notificacion.id, 'DECLINE')}>Rechazar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='emptyContent'>No hay solicitudes de amistad pendientes.</p>
      )}
      {showNotificacion && (
        <Notificacion message={messageNotification} />
      )}
    </div>
  );
};