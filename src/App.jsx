import { useState, useEffect, useRef } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { ULMensajes, LiMensaje } from './components/Mensajes';

const socket = io('localhost:8080');

function App() {
  const [mensajes, setMensajes] = useState(() => {
    const mensajesGuardados = localStorage.getItem('mensajes');
    return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
  });
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : '';
  });
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [registrarse, setRegistrarse] = useState(false);
  const [idRegistro, setIdRegistro] = useState('');
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [passRegistro, setPassRegistro] = useState('');
  const IDusuarioRef = useRef('');
  const passRef = useRef('');

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('chat_message', (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    });

    const mensajesGuardados = localStorage.getItem('mensajes');

    if (mensajesGuardados) {
      setMensajes(JSON.parse(mensajesGuardados));
    }

    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
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
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }, [usuario]);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      usuario: usuario,
      mensaje: nuevoMensaje,
    });
    setNuevoMensaje('');
  };
  
  const handleIniciarSesion = async() => {
    const body ={
      "id": idRegistro,
      "password": passRegistro
    }
    console.log(body)
      try{
        const response = await fetch('https://chatapi20230528200049.azurewebsites.net/api/usuarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        if(response){
          console.log("exito")
        }else{
          console.log("error al registrarse")
        }
      }catch(error){
          console.log(error)
      }
  };

  const handleRegistrarseTrue = () => {
    setRegistrarse(true)
  }
  const handleRegistrarseFalse = () => {
    setRegistrarse(false)
  }

  const handleSalir = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('mensajes')
    setUsuario('')
    setPassword('')
    setMensajes([])
  }

  const handleRegistrarse = async() => {
    const body ={
      "id": idRegistro,
      "usuario": nombreRegistro,
      "password": passRegistro
    }
    console.log(body)
      try{
        const response = await fetch('https://chatapi20230528200049.azurewebsites.net/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        if(response){
          console.log("registro exitoso")
        }else{
          console.log("error al registrarse")
        }
      }catch(error){
          console.log(error)
      }
  }

  if(registrarse && !usuario && !password) {
    return (
      <div>
        <h1>Registrarse</h1>
        <input type='text' placeholder='Ingrese su ID' value={idRegistro} onChange={e => setIdRegistro(e.target.value)}></input>
        <input type='text' placeholder='Ingrese su nombre' value={nombreRegistro} onChange={e => setNombreRegistro(e.target.value)}></input>
        <input type='password' placeholder='Ingrese Contraseña' value={passRegistro} onChange={e => setPassRegistro(e.target.value)}></input>
        <button onClick={handleRegistrarse}>Registrarse</button>
        <button onClick={handleRegistrarseFalse}>Volver</button>
      </div>
    );
  }else if(usuario || password){
    return (
      <div className='App'>
        <h2>{isConnected ? `CONECTADO (${usuario})` : 'NO ESTÁ CONECTADO'}</h2>
        <div className='cajaMensajes'>
          <ULMensajes>
            {mensajes.map((mensaje, index) => (
              <LiMensaje key={index}>
                {mensaje.usuario}: {mensaje.mensaje}
              </LiMensaje>
            ))}
          </ULMensajes>
        </div>
        <div className='controlMensaje'>
          <input 
            className='mensaje'
            type='text'
            name='mensaje' 
            value={nuevoMensaje}
            autoComplete='off'
            onChange={e => setNuevoMensaje(e.target.value)}
          />
          <button onClick={enviarMensaje}>Enviar</button>
          <br/>
        </div>
          <button className='botonSalir' onClick={handleSalir}>Salir</button>
      </div>
    );
  }else{
    return (
      <div className='App'>
        <h1>Bienvenido</h1>
        <input
          className='id_usuario'
          type="text"
          name="id_usuario"
          placeholder="Ingrese su ID"
          ref={IDusuarioRef}
        />
        <input
          className='password'
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          ref={passRef}
        />
        <button onClick={handleIniciarSesion}>Iniciar Sesion</button>
        <button onClick={handleRegistrarseTrue}>Registrarse</button>
      </div>
    );
  }
}

export default App
