import PropTypes from 'prop-types';
import {handleIniciarSesion, handleRegistrarse} from '../logic/Login'

const SingIn = ({
    mensajeValidacion,
    idUsuario,
    setIdUsuario,
    password,
    setPassword,
    handleRegistrarseTrue,
    setNombreUsuario,
    setSesionIniciada,
    setMensajeValidacion,
    setSesionActiva,
    guardarSesionLocalStorage,
}) => {
    return(
        <div className='App'>
        <h1>Bienvenido</h1>
        <p>{mensajeValidacion}</p>
        <div className='cajaLogin'>
          <input
            className='id_usuario'
            autoComplete='off'
            type='text'
            name='id_usuario'
            placeholder='Ingrese su ID'
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
          />
          <input
            className='password'
            type='password'
            name='password'
            placeholder='Ingrese su contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={() => handleIniciarSesion({
            idUsuario,
            password,
            setNombreUsuario,
            setSesionIniciada,
            setMensajeValidacion,
            setSesionActiva,
            guardarSesionLocalStorage,
        })} className='iniciarSesionButton'>
          Iniciar Sesion
        </button>
        <p>- o -</p>
        <button
          onClick={handleRegistrarseTrue}
          className='registrarseButton'
        >
          Registrarse
        </button>
      </div>
    )
}

const SingUp = ({
    idRegistro,
    setIdRegistro,
    nombreRegistro,
    setNombreRegistro,
    passRegistro,
    setPassRegistro,
    handleRegistrarse,
    handleRegistrarseFalse,
    mensajeValidacion,
    setMensajeValidacion,
    setRegistrarse
}) => {
    return(
        <div className='App'>
        <div className='cajaRegistrarse'>
          <h1>Nuevo Usuario</h1>
          <input
            className='idRegistrarse'
            type='text'
            placeholder='Ingrese su ID'
            autoComplete='off'
            value={idRegistro}
            onChange={(e) => setIdRegistro(e.target.value)}
          ></input>
          <input
            className='nombreRegistrarse'
            type='text'
            placeholder='Ingrese su Nombre'
            autoComplete='off'
            value={nombreRegistro}
            onChange={(e) => setNombreRegistro(e.target.value)}
          ></input>
          <input
            className='passRegistrarse'
            type='password'
            placeholder='Ingrese su Contraseña'
            value={passRegistro}
            onChange={(e) => setPassRegistro(e.target.value)}
          ></input>
        </div>
        <button onClick={() => handleRegistrarse({
            idRegistro,
            nombreRegistro,
            passRegistro,
            setMensajeValidacion,
            setRegistrarse,
            setIdRegistro,
            setNombreRegistro,
            setPassRegistro
        })} className='registrarButton'>
          Registrarse
        </button>
        <button onClick={handleRegistrarseFalse} className='volverButton'>
          Volver
        </button>
        <p>{mensajeValidacion}</p>
      </div>
    )
}

SingIn.propTypes = {
    mensajeValidacion: PropTypes.string.isRequired,
    idUsuario: PropTypes.string.isRequired,
    setIdUsuario: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleRegistrarseTrue: PropTypes.func.isRequired,
    setNombreUsuario:PropTypes.func.isRequired,
    setSesionIniciada: PropTypes.func.isRequired,
    setMensajeValidacion: PropTypes.func.isRequired,
    setSesionActiva: PropTypes.func.isRequired,
    guardarSesionLocalStorage: PropTypes.func.isRequired,
};
SingUp.propTypes = {
    idRegistro: PropTypes.string.isRequired,
    setIdRegistro: PropTypes.func.isRequired,
    nombreRegistro: PropTypes.string.isRequired, 
    setNombreRegistro: PropTypes.func.isRequired,
    passRegistro: PropTypes.string.isRequired,
    setPassRegistro: PropTypes.func.isRequired,
    handleRegistrarse: PropTypes.func.isRequired,
    handleRegistrarseFalse: PropTypes.func.isRequired,
    mensajeValidacion: PropTypes.string.isRequired,
    setMensajeValidacion: PropTypes.func.isRequired,
    setRegistrarse: PropTypes.func.isRequired
}

export {SingIn, SingUp};