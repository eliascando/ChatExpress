import { API_URL, API_KEY ,API_KEY_IMAGE, API_URL_IMAGE } from "../services/constants";

export const uploadImage = ({id,file,setImageSrc,setSesionActiva}) => {
    var bodyData = new FormData();
    bodyData.append("image", file);
    bodyData.append("key", API_KEY_IMAGE);

    fetch(API_URL_IMAGE, {
      method: "POST",
      body: bodyData,
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const imageEncoded= btoa(data.data.url);
        setImageSrc(data.data.url);
        const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva'));
        const sesionActualizada = { ...sesionActiva, imagen: data.data.url };
        setSesionActiva(sesionActualizada)
        localStorage.setItem('sesionActiva',JSON.stringify(sesionActualizada));
        GuardarImagen({id, imageEncoded})
        .then(()=>{
        })
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
};
const GuardarImagen = async ({id, imageEncoded}) => {
    try {
      const response = await fetch(`${API_URL}/api/datos/imagen/${id}/${imageEncoded}`, {
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
        throw new Error('Error al atender la solicitud');
      }
    } catch (error) {
      console.error('Error al atender la solicitud:', error);
      throw error;
    }
};
  