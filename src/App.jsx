import { useState, useEffect, useRef} from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { ULMensajes, LiMensaje } from './components/Mensajes';

const socket = io('https://chat-xpress.onrender.com');

function App() {
  const cajaMensajesRef = useRef(null)
  const [mensajes, setMensajes] = useState(() => {
    const mensajesGuardados = localStorage.getItem('mensajes');
    return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
  });
  const [idUsuario, setIdUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : '';
  });
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [registrarse, setRegistrarse] = useState(false);
  const [idRegistro, setIdRegistro] = useState('');
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [passRegistro, setPassRegistro] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState('');
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

  const enviarMensaje = () => {
    if(nuevoMensaje !== ''){
      socket.emit('chat_message', {
        usuario: nombreUsuario,
        mensaje: nuevoMensaje,
      });
      setNuevoMensaje('');
    }
  };
  
  const handleIniciarSesion = async() => {
    if(idUsuario && password){
      try{
          const response = await fetch(`https://chatapi20230528200049.azurewebsites.net/api/usuarios/validar/${idUsuario}/${password}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          let nombre = await response.text()
          if(nombre !== ''){
            setTimeout(() => {
              console.log(nombre)
              setNombreUsuario(nombre)
              setSesionIniciada(true)
            }, 2000);
            setMensajeValidacion('Inicio Exitoso, Bienvenido: '+nombre)
          }else{
            console.log('error al iniciar sesion')
            setMensajeValidacion('Credenciales incorrectas')
            setSesionIniciada(false)
          }
        }catch(error){
          console.log(error)
        }
    }else{
      setMensajeValidacion('Debe ingresar todos los campos')
      setTimeout(() => {
        setMensajeValidacion('')
      }, 1500);
    }  
  };

  const handleRegistrarseTrue = () => {
    setRegistrarse(true)
  }
  const handleRegistrarseFalse = () => {
    setRegistrarse(false)
  }

  const handleSalir = () => {
    localStorage.removeItem('mensajes')
    setIdUsuario('')
    setNombreUsuario('')
    setPassword('')
    setMensajes([])
    setSesionIniciada(false)
    setMensajeValidacion('')
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

  if(registrarse && !idUsuario && !password) {
    return (
      <div className='App'>
        <div className='cajaRegistrarse'>
          <h1>Nuevo Usuario</h1>
          <input 
            className='idRegistrarse'
            type='text' 
            placeholder='Ingrese su ID' 
            autoComplete='off' 
            value={idRegistro} 
            onChange={e => setIdRegistro(e.target.value)}>
          </input>
          <input 
            className='nombreRegistrarse'
            type='text' 
            placeholder='Ingrese su Nombre' 
            autoComplete='off' 
            value={nombreRegistro} 
            onChange={e => setNombreRegistro(e.target.value)}>
          </input>
          <input 
            className='passRegistrarse'
            type='password' 
            placeholder='Ingrese su Contraseña' 
            value={passRegistro} onChange={e => setPassRegistro(e.target.value)}>
          </input>
        </div>
          <button onClick={handleRegistrarse} className='registrarButton'>Registrarse</button>
          <button onClick={handleRegistrarseFalse} className='volverButton'>Volver</button>
      </div>
    );
  }else if(sesionIniciada){
    return (
      <div className='App'>
        <h2>{isConnected ? `CONECTADO (${nombreUsuario})` : 'NO ESTÁ CONECTADO'}</h2>
        <div className='cajaMensajes' ref={cajaMensajesRef}>
          <ULMensajes className='mensajes'>
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
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === 'Return') {
                enviarMensaje();
              }
            }}
          />
          <button onClick={enviarMensaje} className='enviarButton'><img src='/public/send_ico.svg' className='enviarIcono'></img></button>
        </div>
          <button className='botonSalir' onClick={handleSalir}>Salir</button>
      </div>
    );
  }else{
    return (
      <div className='App'>
        <h1>Bienvenido</h1>
        <p>{mensajeValidacion}</p>
        <div className='cajaLogin'>
          <input
            className='id_usuario'
            autoComplete='off'
            type="text"
            name="id_usuario"
            placeholder="Ingrese su ID"
            value={idUsuario}
            onChange={e => setIdUsuario(e.target.value)}
          />
          <input
            className='password'
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </div>
        <button onClick={handleIniciarSesion} className='iniciarSesionButton'>Iniciar Sesion</button>
        <p>- o -</p>
        <button onClick={handleRegistrarseTrue} className='registrarseButton'>Registrarse</button>
      </div>
    );
  }
}

export default App
