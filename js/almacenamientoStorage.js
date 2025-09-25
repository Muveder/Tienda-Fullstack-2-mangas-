// js/almacenamientoStorage.js

// ----------------------
// Usuarios
// ----------------------
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function guardarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function generarIdUsuario() {
  return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

function obtenerUsuario(id) {
  return usuarios.find(u => u.id === id);
}

function eliminarUsuario(id) {
  usuarios = usuarios.filter(u => u.id !== id);
  guardarUsuarios();
}

function validarRun(run) {
  if (!run) return false;
  run = run.toUpperCase();
  return /^[0-9]{7,8}[0-9K]$/.test(run);
}

function validarCorreo(correo) {
  if (!correo) return false;
  if (correo.length > 100) return false;
  const patron = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
  return patron.test(correo);
}

// ----------------------
// Productos (para carrito y admin)
// ----------------------
let productos = JSON.parse(localStorage.getItem('productos')) || [];

function guardarProductos() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function generarIdProducto() {
  return productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
}

function obtenerProducto(id) {
  return productos.find(p => p.id === id);
}

function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
  guardarProductos();
}
