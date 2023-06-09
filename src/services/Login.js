import { API_KEY, API_URL } from "./constants";

export const ValidarUsuario = async({
    idUsuario,
    password
}) => {
    const response = await fetch(
        `${API_URL}/api/usuarios/validar/${idUsuario}/${password}`,
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apiKey' : API_KEY
        },
        }
    );
    if (response.ok) {
        const usuarioEncontrado = await response.json();
        return usuarioEncontrado;
    } else {
        throw new Error('Error al validar el usuario');
    }
}

export const RegistrarUsuario = async({
    idRegistro,
    nombreRegistro,
    passRegistro
}) => {
    const body = {
        id: idRegistro,
        usuario: nombreRegistro,
        password: passRegistro,
        imagen: ''
    };
    const response = await fetch(
        `${API_URL}/api/usuarios`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apiKey': API_KEY
        },
        body: JSON.stringify(body),
        }
    )
    return await response;
}