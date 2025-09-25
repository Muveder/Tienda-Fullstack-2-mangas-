// js/iniciador-de-usuarios.js

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("usuarios")) {
    const defaultUsers = [
      {
        correo: "administrador@gmail.com",
        password: "1234",
        tipoUsuario: "admin",
        nombre: "Administrador",
        apellidos: "",
        fechaNacimiento: "",
        region: "",
        comuna: "",
        direccion: ""
      }
    ];
    localStorage.setItem("usuarios", JSON.stringify(defaultUsers));
    console.log("Usuario por defecto creado");
  }
});
