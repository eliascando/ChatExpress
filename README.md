# ChatExpress
Aplicación Web de Chat en tiempo real con React y Node.js utilizando APIREST Full y Socket.io

La aplicación se basa en la interacción entre usuarios pudiendo enviarse mensajes en tiempo real y enviar solicitudes a otras personas

Desarrollado con React y Vite, utiliza la libreria de [socket.io-client](https://socket.io/docs/v4/client-api/) para el cliente manejando la funcionalidad de chat en tiempo real conectandose a un servidor para atender la solicitud con otros clientes y servicio web propio APIRest Full desarrollado en .NET con C# para la funcionalidad de inicio de sesion, registro de usuario, envio y gestión de solicitudes, y poder guardar su foto de perfil, esta ultima apoyandose con la api de [imgbb](https://api.imgbb.com/) para el guardado de imagenes en la nube

---

Página de Bienvenida para Iniciar Sesión o Registrarse
![image](https://github.com/eliascando/ChatExpress/assets/75767835/cf2ebb9d-ce41-435d-8074-5bcc537d24a4)

Pantalla de Inicio con los usuarios para chatear
![image](https://github.com/eliascando/ChatExpress/assets/75767835/ce672faf-fd37-4b44-bf96-0308f2f36df7)

Pantall de chat con una persona
![image](https://github.com/eliascando/ChatExpress/assets/75767835/1eac933b-9d49-412f-ae86-0625dcf9f11c)

Pantalla de respuesta del chat
![image](https://github.com/eliascando/ChatExpress/assets/75767835/94ed52ca-08ef-4e2f-a3db-4dfd0d88feab)

Indicativo de usuario desconectado
![image](https://github.com/eliascando/ChatExpress/assets/75767835/7d6e7421-2f86-4fbe-af8d-d2446e3f5705)

Página para buscar usuarios registrados y enviar solicitud de amistad
![image](https://github.com/eliascando/ChatExpress/assets/75767835/028b7db4-580c-46a4-9032-f19486c3e59b)

Página para aceptar o rechazar solicitudes de amistad
![image](https://github.com/eliascando/ChatExpress/assets/75767835/43995892-af5b-4e56-8ee6-dd98c5576adf)

Página de ajustes del perfil como cambiar foto, contraseña y actualizar datos
![image](https://github.com/eliascando/ChatExpress/assets/75767835/1eda4463-b6d5-48f7-8532-694fbfdbdd89)

## Tecnologías Utilizadas  
<img src="https://github.com/eliascando/eliascando/assets/75767835/7d7766a2-3680-4dd8-a3df-9d6fb933a684" alter="react" width="75px">
<img src="https://github.com/eliascando/eliascando/assets/75767835/d22a9204-4e7e-4bf8-81f3-e4d52c8e2e57" alter="nodejs" width="70px">
<img src="https://github.com/eliascando/eliascando/assets/75767835/f82bb3e1-315a-495e-9394-9dc9d1d59010" alter="c#" width="80px">
<img src="https://github.com/eliascando/eliascando/assets/75767835/e1db3654-ee6a-48c3-9e58-d7eea5daf53c" alter="gh" width="70px">
<img src="https://github.com/eliascando/eliascando/assets/75767835/c1634d4b-6c9e-4afd-8f0f-6f0e46a86f1c" alter="vercel" width="150px"> 
<img src="https://github.com/eliascando/eliascando/assets/75767835/2dea7b73-d136-4088-a988-bd89ad5697fc" alter="mssql" width="80px">
<img src="https://github.com/eliascando/eliascando/assets/75767835/cc4b42c6-64e9-49e0-91de-aa34dc0ab4a3" alter="logo" width="100px">
<img src="https://github.com/eliascando/eliascando/assets/75767835/e4946c81-8b5b-4479-99ad-37f6f06b908d" alter="logo" width="100px">  

## Diseño de la base de datos
![image](https://github.com/eliascando/ChatExpress/assets/75767835/c4ed95ce-45a1-4fbe-a554-36b9e1230592)

### [Repositorio de servidor utilizado](https://github.com/eliascando/chat-websocket-v2)
Desarrollado en nodejs utilizando la librería [socket.io](https://socket.io/docs/v4/server-api/) para servidores proporcionando funcionalidad al chat

## Para ejecutar el proyecto en entorno de desarrollo

Debe clonar el proyecto en su directorio
```
  git clone https://github.com/eliascando/ChatExpress.git
```
Moverse en la consola al directorio donde se clonó el proyecto
```
  cd C://Users/user/ChatExpress
```
Debe instalar las dependencias del proyecto
```
  npm install
```
Luego se puede ejecutar el proyecto en modo desarrollo
```
  npm run dev
```
> **Nota:** Debe tener instalado git y node.js para poder instalar las dependencias y ejecutar el proyecto
