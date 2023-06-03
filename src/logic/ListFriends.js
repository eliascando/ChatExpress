import { API_KEY, API_URL } from "../services/constants";

export const ListarAmigos = async() =>{
    fetch(`${API_URL}/api/usuarios/listar`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'apiKey' : API_KEY
        }
    })
        .then(response => response.json)
        .then(data =>{
            console.log(data);
        })
        .catch(error => {
            console.log(error)
    })
}