import { API_URL, API_KEY } from '../services/constants';

export const obtenerUsuarios = async (id) => {
  try {
    const response = await fetch(API_URL + '/api/usuarios/listar/'+ id, {
      method: 'GET',
      headers: {
        'apiKey': API_KEY
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al obtener los usuarios');
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

export const obtenerListaAmigos = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/amigos/listar/${id}`, {
        method: 'GET',
        headers: {
          'apiKey': API_KEY
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error al obtener la lista de amigos');
      }
    } catch (error) {
      console.error('Error al obtener la lista de amigos:', error);
      throw error;
    }
};

export const enviarSolicitud = async (idSend, idReq) => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios/solicitud/${idSend}/${idReq}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': API_KEY
        }
      });
  
      if (response.ok) {
        const data = await response.ok;
        return data;
      } else {
        throw new Error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      throw error;
    }
};
export const obtenerNotificaciones = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/notificaciones/${id}`, {
        method: 'GET',
        headers: {
          'apiKey': API_KEY
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error al obtener las notificaciones');
      }
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
      throw error;
    }
};
  
export const atenderSolicitud = async (idResponse, idRequest, respuesta) => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios/solicitud/atender/${idResponse}/${idRequest}/${respuesta}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': API_KEY
        }
      });
  
      if (response.ok) {
        const data = await response.ok;
        return data;
      } else {
        throw new Error('Error al atender la solicitud');
      }
    } catch (error) {
      console.error('Error al atender la solicitud:', error);
      throw error;
    }
  };
  