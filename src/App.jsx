import { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { SingIn,SingUp } from './components/Login';
import { Chat } from './components/Chat';

const socket = io('https://chat-xpress.onrender.com');

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
  const [isConnected, setIsConnected] = useState(null);
  const [registrarse, setRegistrarse] = useState(false);
  const [idRegistro, setIdRegistro] = useState('');
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [passRegistro, setPassRegistro] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState('');
  const [sesionActiva, setSesionActiva] = useState({});
  const [choosedRoom, setChoosedRoom] = useState(() => {
    const salaActiva = localStorage.getItem('sala-activa');
    if(JSON.parse(salaActiva) === 'si'){return true}
    else return null
  });
  const [room, setRoom] = useState(() => {
    const salaGuardada = localStorage.getItem('sala');
    return salaGuardada ? JSON.parse(salaGuardada) : '';
  });

  useEffect(() => {
    if(idUsuario && nombreUsuario && password){
      socket.on('connect', () => {
        setIsConnected(true);
      });
      setSesionActiva({idUsuario, nombreUsuario, password});
      setSesionIniciada(true);
    }

    const passwordGuardado = localStorage.getItem('password');
    if (passwordGuardado) {
      setPassword(JSON.parse(passwordGuardado));
    }
  
    return () => {
      socket.off('connection');
      socket.off('chat_message');
    };
    
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
  };

  const handleRegistrarseFalse = () => {
    setRegistrarse(false);
  };

  const handleSalir = () => {
    localStorage.setItem('mensajes',JSON.stringify([]))
    localStorage.setItem('usuario', JSON.stringify(null))
    localStorage.setItem('sesion', JSON.stringify(null))
    localStorage.setItem('password', JSON.stringify(null))
    localStorage.setItem('sala', JSON.stringify(null))
    localStorage.setItem('sala-activa', JSON.stringify(null))
    setIsConnected(null)
    setRegistrarse(false)
    setIdRegistro('')
    setNombreRegistro('')
    setPassRegistro('')
    setSesionIniciada(false)
    setMensajeValidacion('')
    setSesionActiva({})
    setChoosedRoom(null)
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
        <Chat
          isConnected={isConnected}
          nombreUsuario={nombreUsuario}
          socket={socket}
          handleSalir={handleSalir}
          choosedRoom={choosedRoom}
          setChoosedRoom={setChoosedRoom}
          room={room}
          setRoom={setRoom}
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
