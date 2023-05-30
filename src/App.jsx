import { useState, useEffect, useRef } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { SingIn,SingUp } from './components/Login';
import { Chat } from './components/Chat';

const socket = io('https://chat-xpress.onrender.com');

function App() {
  const cajaMensajesRef = useRef(null);
  const [mensajes, setMensajes] = useState(() => {
    const mensajesGuardados = localStorage.getItem('mensajes');
    return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
  });
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
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [registrarse, setRegistrarse] = useState(false);
  const [idRegistro, setIdRegistro] = useState('');
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [passRegistro, setPassRegistro] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState('');
  const [sesionActiva, setSesionActiva] = useState({});

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
      socket.off('connect');
      socket.off('chat_message');
    };
  }, []);  
  
  useEffect(() => {
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
  }, [mensajes]);

  useEffect(() => {
    if (cajaMensajesRef.current) {
      cajaMensajesRef.current.scrollTop = cajaMensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

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
    localStorage.removeItem('mensajes');
    localStorage.removeItem('sesion');
    setIdUsuario('');
    setNombreUsuario('');
    setPassword('');
    setMensajes([]);
    setSesionIniciada(false);
    setMensajeValidacion('');
    setSesionActiva({});
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
        />
      )}
      {sesionIniciada && sesionActiva && (
        <Chat
          isConnected={isConnected}
          nombreUsuario={nombreUsuario}
          cajaMensajesRef={cajaMensajesRef}
          mensajes={mensajes}
          setMensajes={setMensajes}
          nuevoMensaje={nuevoMensaje}
          setNuevoMensaje={setNuevoMensaje}
          socket={socket}
          handleSalir={handleSalir}
        />
      )}
      {!registrarse && !sesionIniciada && (
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