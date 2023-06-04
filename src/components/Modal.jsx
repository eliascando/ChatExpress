/* eslint-disable react/prop-types */
import { useRef } from 'react';
import '../css/Modal.css';

export const Notificacion = ({ message }) => {
  const modalRef = useRef(null);

  const handleClose = () => {
    modalRef.current.style.display = 'none';
  };

  return (
    <div className="modal-overlay" ref={modalRef}>
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};
