import { RegistrarUsuario, ValidarUsuario } from "../services/Login";

export const handleIniciarSesion = async({
    idUsuario,
    password,
    setNombreUsuario,
    setSesionIniciada,
    setMensajeValidacion,
    setSesionActiva,
    guardarSesionLocalStorage,
}) => {
    if (idUsuario && password) {
      try {
        const nombre = (await ValidarUsuario({idUsuario, password}));
        if (nombre !== '') {
          setTimeout(() => {
            console.log(nombre);
            setNombreUsuario(nombre);
            setSesionIniciada(true);
          }, 2000);
          setMensajeValidacion('Inicio Exitoso, Bienvenido: ' + nombre);
          setSesionActiva(idUsuario, nombre, password)
          guardarSesionLocalStorage();
        } else {
          console.log('error al iniciar sesion');
          setMensajeValidacion('Credenciales incorrectas');
          setSesionIniciada(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setMensajeValidacion('Debe ingresar todos los campos');
      setTimeout(() => {
        setMensajeValidacion('');
      }, 1500);
    }
};

export const handleRegistrarse = async ({
    idRegistro,
    nombreRegistro,
    passRegistro,
    setMensajeValidacion,
    setRegistrarse,
    setIdRegistro,
    setNombreRegistro,
    setPassRegistro
}) => {
    if(idRegistro && nombreRegistro && passRegistro){
      try {
        let response = RegistrarUsuario({
            idRegistro,
            nombreRegistro,
            passRegistro
        })
        if (response.ok) {
          console.log('registro exitoso');
          setTimeout(() => {
            setMensajeValidacion('')
          }, 1500);
          setMensajeValidacion('Registrado exitosamente')
          setRegistrarse(false)
          setIdRegistro('')
          setNombreRegistro('')
          setPassRegistro('')
        } else {
          console.log('error al registrarse');
          setTimeout(() => {
            setMensajeValidacion('')
          }, 1500);
          setMensajeValidacion('No se pudo registrar, el id no es válido')
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      setTimeout(() => {
        setMensajeValidacion('')
      }, 1500);
      setMensajeValidacion('Debe ingresar todos los campos')
    }
};