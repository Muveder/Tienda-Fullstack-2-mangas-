

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    // Obtener usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Buscar usuario que coincida
    const user = usuarios.find(u => u.correo === correo && u.password === contrasena);

    if (user) {
 
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", user.tipoUsuario === "admin" ? "admin" : "usuario");
      localStorage.setItem("usuarioActual", JSON.stringify(user));

      if (user.tipoUsuario === "admin") {
        window.location.href = "../Admin/index.html";
      } else {
        window.location.href = "../index.html";
      }
    } else {
      alert("Correo o contraseña incorrectos");
    }
  });
});
