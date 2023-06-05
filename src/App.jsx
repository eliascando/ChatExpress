import { useState, useEffect } from 'react';
import './App.css';
import { SingIn,SingUp } from './components/Login';
//import { JoinRoom } from './components/JoinRoom';
import { MainScreen } from './components/MainScreen';

function App() {

  const [idUsuario, setIdUsuario] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [registrarse, setRegistrarse] = useState(false);
  const [idRegistro, setIdRegistro] = useState('');
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [passRegistro, setPassRegistro] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(() => {
    const sesionIniciadaGuardada = localStorage.getItem('sesionIniciada');
    return sesionIniciadaGuardada ? true : false
  });
  const [mensajeValidacion, setMensajeValidacion] = useState('');
  const [sesionActiva, setSesionActiva] = useState(() => {
    const sesionActivaGuardada = localStorage.getItem('sesionActiva');
    return sesionActivaGuardada ? JSON.parse(sesionActivaGuardada) : {}
  });

  const guardarSesionLocalStorage = (usuario) => {
    localStorage.setItem('sesionActiva',JSON.stringify(usuario));
    localStorage.setItem('sesionIniciada',true);
  };
  
  const handleRegistrarseTrue = () => {
    setRegistrarse(true);
    setMensajeValidacion('')
    setIdUsuario('')
    setPassword('')
  };

  const handleRegistrarseFalse = () => {
    setRegistrarse(false);
    setMensajeValidacion('')
  };

  const handleSalir = () => {
    localStorage.clear()
    setRegistrarse(false)
    setIdRegistro('')
    setNombreRegistro('')
    setPassRegistro('')
    setSesionIniciada(false)
    setMensajeValidacion('')
    setSesionActiva({})
    setIdUsuario('')
    setNombreUsuario('')
    setPassword('')
  };

  return (
    <>
      {registrarse && !idUsuario && !password && (
        <SingUp
          idRegistro={idRegistro}
          setIdRegistro={setIdRegistro}
          nombreRegistro={nombreRegistro}
          setNombreRegistro={setNombreRegistro}
          passRegistro={passRegistro}
          setPassRegistro={setPassRegistro}
          handleRegistrarseFalse={handleRegistrarseFalse}
          mensajeValidacion={mensajeValidacion}
          setMensajeValidacion={setMensajeValidacion}
          setRegistrarse={setRegistrarse}
        />
      )}
      {sesionIniciada && sesionActiva && (
        <MainScreen
          handleSalir={handleSalir}
          sesionActiva={sesionActiva}
          setSesionActiva={setSesionActiva}
        />
      )}
      {!registrarse && !sesionIniciada &&(
        <SingIn
          mensajeValidacion={mensajeValidacion}
          idUsuario={idUsuario}
          setIdUsuario={setIdUsuario}
          password={password}
          setPassword={setPassword}
          handleRegistrarseTrue={handleRegistrarseTrue}
          setNombreUsuario={setNombreUsuario}
          setSesionIniciada={setSesionIniciada}
          setMensajeValidacion={setMensajeValidacion}
          setSesionActiva={setSesionActiva}
          guardarSesionLocalStorage={guardarSesionLocalStorage}
        />
      )}
    </>
  );
}

export default App;
