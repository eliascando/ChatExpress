export const ValidarUsuario = async({
    idUsuario,
    password
}) => {
    const response = await fetch(
        `https://chatapi20230528200049.azurewebsites.net/api/usuarios/validar/${idUsuario}/${password}`,
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        }
    );
    return await response.text();
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
      };
    const response = await fetch(
        'https://chatapi20230528200049.azurewebsites.net/api/usuarios',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        }
    )
    return await response;
}