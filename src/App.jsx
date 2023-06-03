import { useState, useEffect } from 'react';
import './App.css';
import { SingIn,SingUp } from './components/Login';
import { JoinRoom } from './components/JoinRoom';
import { MainScreen } from './components/MainScreen';

function App() {

  const [idUsuario, setIdUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : '';
  });
  const [nombreUsuario, setNombreUsuario] = useState(() => {
    const nombreGuardado = localStorage.getItem('sesion');
    return nombreGuardado ? JSON.parse(nombreGuardado) : '';
  });
  
  const [password, setPassword] = useState(() => {
    const passwordGuardado = localStorage.getItem('password');
    return passwordGuardado ? JSON.parse(passwordGuardado) : '';
  });
  const [registrarse, setRegistrarse] = useState(false);
  const [idRegistro, setIdRegistro] = useState('');
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [passRegistro, setPassRegistro] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState('');
  const [sesionActiva, setSesionActiva] = useState({});
  const [choosedRoom, setChoosedRoom] = useState(() => {
    const salaActiva = localStorage.getItem('sala-activa');
    return salaActiva ? true : false
  });
  const [room, setRoom] = useState(() => {
    const salaGuardada = localStorage.getItem('sala');
    return salaGuardada ? JSON.parse(salaGuardada) : '';
  });

  useEffect(() => {
    if(idUsuario && nombreUsuario && password){
      setSesionActiva({idUsuario, nombreUsuario, password});
      setSesionIniciada(true);
    }

    const passwordGuardado = localStorage.getItem('password');
    if (passwordGuardado) {
      setPassword(JSON.parse(passwordGuardado));
    }
    
  }, []);    
  
  useEffect(() => {
    setSesionActiva({ idUsuario, nombreUsuario, password });
    guardarSesionLocalStorage();
  }, [idUsuario, nombreUsuario, password]);
  
  const guardarSesionLocalStorage = () => {
    localStorage.setItem('usuario', JSON.stringify(idUsuario));
    localStorage.setItem('sesion', JSON.stringify(nombreUsuario));
    localStorage.setItem('password', JSON.stringify(password));
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
    setChoosedRoom(false)
    setRoom('')
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
        /*<JoinRoom
        room = {room}
        setRoom = {setRoom}
        choosedRoom = {choosedRoom}
        setChoosedRoom = {setChoosedRoom}
        nombreUsuario = {nombreUsuario}
        handleSalir={handleSalir}
        />*/
        <MainScreen
          handleSalir={handleSalir}
        />
      )}
      {!registrarse && !sesionIniciada && !room && !choosedRoom &&(
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
