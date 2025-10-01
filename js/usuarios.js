
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Función para guardar usuarios en localStorage
function guardarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Obtener usuario por id
function obtenerUsuario(id) {
  return usuarios.find(u => u.id === id);
}

// Eliminar usuario por id
function eliminarUsuario(id) {
  usuarios = usuarios.filter(u => u.id !== id);
  guardarUsuarios();
}

// Generar ID único
function generarIdUsuario() {
  return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

// ----------------------
// VALIDACIONES
// ----------------------
function validarRun(run) {
  if (!run) return false;
  run = run.toUpperCase();
  return /^[0-9]{7,8}[0-9K]$/.test(run);
}

function validarCorreo(correo) {
  if (!correo || correo.length > 100) return false;
  const patron = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
  return patron.test(correo);
}

// ----------------------
// CREAR USUARIO
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const formCrear = document.getElementById("form-nuevo-usuario");
  if (formCrear) {
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    // Cargar regiones
    regiones.forEach(r => {
      const option = document.createElement("option");
      option.value = r.nombre;
      option.textContent = r.nombre;
      selectRegion.appendChild(option);
    });

    // Cambiar comunas según región
    selectRegion.addEventListener("change", () => {
      const regionSeleccionada = selectRegion.value;
      const r = regiones.find(reg => reg.nombre === regionSeleccionada);
      selectComuna.innerHTML = "";
      if (r) {
        r.comunas.forEach(c => {
          const option = document.createElement("option");
          option.value = c;
          option.textContent = c;
          selectComuna.appendChild(option);
        });
      }
    });

    // Reset comunas al limpiar formulario
    formCrear.addEventListener("reset", () => {
      selectComuna.innerHTML = "";
    });

    // Manejar envío del formulario
    formCrear.addEventListener("submit", e => {
      e.preventDefault();

      const run = formCrear.run.value.trim().toUpperCase();
      const nombre = formCrear.nombre.value.trim();
      const apellidos = formCrear.apellidos.value.trim();
      const correo = formCrear.correo.value.trim();
      const fechaNacimiento = formCrear.fechaNacimiento.value;
      const tipoUsuario = formCrear.tipoUsuario.value;
      const region = formCrear.region.value;
      const comuna = formCrear.comuna.value;
      const direccion = formCrear.direccion.value.trim();

      // Validaciones
      if (!validarRun(run)) return alert("RUN inválido. Ej: 19011022K");
      if (!nombre || nombre.length > 50) return alert("Nombre inválido (máx. 50 caracteres)");
      if (!apellidos || apellidos.length > 100) return alert("Apellidos inválidos (máx. 100 caracteres)");
      if (!validarCorreo(correo)) return alert("Correo inválido. Solo @duoc.cl, @profesor.duoc.cl, @gmail.com");
      if (!direccion || direccion.length > 300) return alert("Dirección inválida (máx. 300 caracteres)");

      // Crear usuario
      const usuario = {
        id: generarIdUsuario(),
        run,
        nombre,
        apellidos,
        correo,
        fechaNacimiento,
        tipoUsuario,
        region,
        comuna,
        direccion
      };

      usuarios.push(usuario);
      guardarUsuarios();
      alert("✅ Usuario agregado correctamente!");
      formCrear.reset();
      selectComuna.innerHTML = "";
    });
  }

  // ----------------------
  // EDITAR USUARIO
  // ----------------------
  const formEditar = document.getElementById("form-editar-usuario");
  if (formEditar) {
    const idEditar = parseInt(localStorage.getItem("editarUsuarioId"));
    const usuario = obtenerUsuario(idEditar);

    if (!usuario) {
      alert("Usuario no encontrado");
      window.location.href = "usuariosmostrar.html";
      return;
    }

    // Cargar regiones
    regiones.forEach(r => {
      const option = document.createElement("option");
      option.value = r.nombre;
      option.textContent = r.nombre;
      formEditar.region.appendChild(option);
    });

    // Cargar comunas según región
    function cargarComunas(region) {
      const r = regiones.find(reg => reg.nombre === region);
      formEditar.comuna.innerHTML = "";
      if (r) {
        r.comunas.forEach(c => {
          const option = document.createElement("option");
          option.value = c;
          option.textContent = c;
          formEditar.comuna.appendChild(option);
        });
      }
    }

    // Rellenar formulario
    formEditar.run.value = usuario.run;
    formEditar.nombre.value = usuario.nombre;
    formEditar.apellidos.value = usuario.apellidos;
    formEditar.correo.value = usuario.correo;
    formEditar.fechaNacimiento.value = usuario.fechaNacimiento || "";
    formEditar.tipoUsuario.value = usuario.tipoUsuario;
    formEditar.region.value = usuario.region;
    cargarComunas(usuario.region);
    formEditar.comuna.value = usuario.comuna;
    formEditar.direccion.value = usuario.direccion;

    formEditar.region.addEventListener("change", () => cargarComunas(formEditar.region.value));

    formEditar.addEventListener("submit", e => {
      e.preventDefault();

      const run = formEditar.run.value.trim().toUpperCase();
      const nombre = formEditar.nombre.value.trim();
      const apellidos = formEditar.apellidos.value.trim();
      const correo = formEditar.correo.value.trim();
      const fechaNacimiento = formEditar.fechaNacimiento.value;
      const tipoUsuario = formEditar.tipoUsuario.value;
      const region = formEditar.region.value;
      const comuna = formEditar.comuna.value;
      const direccion = formEditar.direccion.value.trim();

      // Validaciones
      if (!validarRun(run)) return alert("RUN inválido");
      if (!nombre || nombre.length > 50) return alert("Nombre inválido");
      if (!apellidos || apellidos.length > 100) return alert("Apellidos inválidos");
      if (!validarCorreo(correo)) return alert("Correo inválido");
      if (!direccion || direccion.length > 300) return alert("Dirección inválida");

      Object.assign(usuario, { run, nombre, apellidos, correo, fechaNacimiento, tipoUsuario, region, comuna, direccion });
      guardarUsuarios();
      alert("✅ Usuario editado correctamente!");
      localStorage.removeItem("editarUsuarioId");
      window.location.href = "usuariosmostrar.html";
    });
  }

  // ----------------------
  // LISTAR USUARIOS
  // ----------------------
  const tabla = document.getElementById("tabla-usuarios");
  if (tabla) {
    function renderizar() {
      tabla.innerHTML = "";

      if (usuarios.length === 0) {
        tabla.innerHTML = `<tr><td colspan="7">No hay usuarios registrados</td></tr>`;
        return;
      }

      usuarios.forEach(u => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${u.run}</td>
          <td>${u.nombre} ${u.apellidos}</td>
          <td>${u.correo}</td>
          <td>${u.tipoUsuario}</td>
          <td>${u.region} - ${u.comuna}</td>
          <td>${u.direccion}</td>
          <td>
            <button class="editar" data-id="${u.id}">Editar</button>
            <button class="eliminar" data-id="${u.id}">Eliminar</button>
          </td>
        `;
        tabla.appendChild(tr);
      });

      // Botones editar
      tabla.querySelectorAll(".editar").forEach(btn => {
        btn.addEventListener("click", e => {
          const id = parseInt(e.target.dataset.id);
          localStorage.setItem("editarUsuarioId", id);
          window.location.href = "usuarioeditar.html";
        });
      });

      // Botones eliminar
      tabla.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", e => {
          const id = parseInt(e.target.dataset.id);
          if (confirm("¿Seguro que quieres eliminar este usuario?")) {
            eliminarUsuario(id);
            renderizar();
          }
        });
      });
    }

    renderizar();
  }
});
