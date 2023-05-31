import { useState } from "react";
import PropTypes from "prop-types";

const ChooseRoom = ({
    setRoom,
    setChoosedRoom,
    socket,
    nombreUsuario
}) => {
    
    const [capturarSala, setCapturarSala] = useState('');

    const handleIngresarSala = () =>{
        if(capturarSala !== ''){
            setChoosedRoom(true)
            setRoom(capturarSala)
            socket.emit('join_room',{ 
                room: capturarSala, 
                user: nombreUsuario
            });
            localStorage.setItem('sala', JSON.stringify(capturarSala));
            localStorage.setItem('sala-activa',JSON.stringify('si'))
        }else{
            setChoosedRoom(false)
        }
    }
    return(
        <div>
            <h1>Ingrese el nombre de la sala:</h1>
            <input
                type="text"
                placeholder="Ingrese..."
                onChange={(e) => setCapturarSala(e.target.value)}
            ></input>
            <button onClick={() => handleIngresarSala()}
            >Ingresar</button>
        </div>
    )
}

ChooseRoom.propTypes = {
    setRoom: PropTypes.func.isRequired,
    setChoosedRoom: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    nombreUsuario: PropTypes.string.isRequired
};
  
export {ChooseRoom};