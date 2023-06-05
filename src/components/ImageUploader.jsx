import { useState } from "react";
import '../css/ImageUpload.css'

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState("");

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    uploadImage(file);
    showImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file);
    showImage(file);
  };

  const uploadImage = (file) => {
    var bodyData = new FormData();
    var imageFile = file
    bodyData.append("image",imageFile)
    /*fetch("https://api.imgur.com/3/upload",{
        method: "POST",
        headers: {
            Authorization: `Client-ID`,
            Accept: `application/json`,
        },
        body: bodyData,
    }).then(function(res){
        return res.json();
    }).then(function(json){
        console.log(json)
    })*/
  };
  
  const showImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="ImageUpload">
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="areaImagen"
        >
            {imageSrc && <img src={imageSrc} alt="Imagen" className="imagen"/>}
            {!imageSrc&&(<label htmlFor="file-input" className="label">Arrastre o haga click para subir su foto</label>)}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="file-input"
                className="botonSubir"
            />
        </div>
        <div className="cambiarImagen">
            {imageSrc&&(<label htmlFor="file-input" className="label-cambiar">Cambiar Foto</label>)}
        </div>
    </div>
  );
};

export {ImageUploader};
