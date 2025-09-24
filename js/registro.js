document.addEventListener("DOMContentLoaded", function registroUsuario() {
  const form = document.getElementById("form-registro");

  // Cargar regiones y comunas
  cargarRegiones("region", "comuna");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const run = document.getElementById("run").value.trim().toUpperCase();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;

    // Validaciones
    if (!nombre || !run || !correo || !contrasena || !region || !comuna) {
      return alert("Todos los campos son obligatorios");
    }

    if (!validarRun(run)) {
      return alert("RUN inválido");
    }

    if (!validarCorreo(correo)) {
      return alert("Correo inválido, solo se permiten @gmail.com, @duoc.cl y @profesor.duoc.cl");
    }

    // Obtener usuarios actuales
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validar correo único
    if (usuarios.some(u => u.correo === correo)) {
      return alert("Ya existe un usuario con ese correo");
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
      nombre,
      run,
      correo,
      contrasena,
      region,
      comuna,
      role: "usuario"
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente ✅");
    form.reset();
    window.location.href = "login.html";
  });
});
