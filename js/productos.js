let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Guardar en localStorage
function guardarProductos() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Generar ID único
function generarId() {
  return productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
}

// CRUD
function agregarProducto(producto) {
  producto.id = generarId();
  productos.push(producto);
  guardarProductos();
}

function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
  guardarProductos();
}

function obtenerProducto(id) {
  return productos.find(p => p.id === id);
}

function actualizarProducto(id, datos) {
  const prod = obtenerProducto(id);
  if (prod) {
    Object.assign(prod, datos);
    guardarProductos();
  }
}

// ---------------------
// FORMULARIO CREAR
// ---------------------
document.addEventListener('DOMContentLoaded', () => {
  const formNuevo = document.getElementById('form-nuevo-producto');
  if (formNuevo) {
    formNuevo.addEventListener('submit', e => {
      e.preventDefault();

      const codigo = formNuevo.codigo.value.trim();
      const nombre = formNuevo.nombre.value.trim();
      const descripcion = formNuevo.descripcion.value.trim();
      const precio = parseFloat(formNuevo.precio.value);
      const stock = parseInt(formNuevo.stock.value);
      const stockCritico = parseInt(formNuevo.stockCritico.value) || null;
      const categoria = formNuevo.categoria.value;

      if (!nombre || codigo.length < 3 || precio < 0 || stock < 0 || !categoria) {
        return alert('Datos inválidos');
      }

      const archivo = formNuevo.imagen.files[0];
      if (archivo) {
        const reader = new FileReader();
        reader.onload = function () {
          agregarProducto({ codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen: reader.result });
          alert('Producto agregado ✅');
          formNuevo.reset();
        };
        reader.readAsDataURL(archivo);
      } else {
        agregarProducto({ codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen: formNuevo.imagen.value.trim() || '' });
        alert('Producto agregado ✅');
        formNuevo.reset();
      }
    });
  }

  // ---------------------
  // FORMULARIO EDITAR
  // ---------------------
  const formEditar = document.getElementById('form-editar-producto');
  if (formEditar) {
    const idEditar = parseInt(localStorage.getItem('editarProductoId'));
    const producto = obtenerProducto(idEditar);
    if (!producto) {
      alert('Producto no encontrado');
      window.location.href = 'productosmostrar.html';
      return;
    }

    formEditar.codigo.value = producto.codigo;
    formEditar.nombre.value = producto.nombre;
    formEditar.descripcion.value = producto.descripcion || '';
    formEditar.precio.value = producto.precio;
    formEditar.stock.value = producto.stock;
    formEditar.stockCritico.value = producto.stockCritico || '';
    formEditar.categoria.value = producto.categoria;

    formEditar.addEventListener('submit', e => {
      e.preventDefault();
      const datos = {
        codigo: formEditar.codigo.value.trim(),
        nombre: formEditar.nombre.value.trim(),
        descripcion: formEditar.descripcion.value.trim(),
        precio: parseFloat(formEditar.precio.value),
        stock: parseInt(formEditar.stock.value),
        stockCritico: parseInt(formEditar.stockCritico.value) || null,
        categoria: formEditar.categoria.value
      };

      const archivo = formEditar.imagen.files[0];
      if (archivo) {
        const reader = new FileReader();
        reader.onload = function () {
          datos.imagen = reader.result;
          actualizarProducto(idEditar, datos);
          alert('Producto actualizado ✅');
          window.location.href = 'productosmostrar.html';
        };
        reader.readAsDataURL(archivo);
      } else {
        datos.imagen = formEditar.imagen.value.trim() || '';
        actualizarProducto(idEditar, datos);
        alert('Producto actualizado ✅');
        window.location.href = 'productosmostrar.html';
      }
    });
  }

  // ---------------------
  // LISTAR PRODUCTOS
  // ---------------------
  const tabla = document.getElementById('tabla-productos');
  if (tabla) {
    function renderizar() {
      tabla.innerHTML = '';
      productos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.id}</td>
          <td>${p.codigo}</td>
          <td>${p.nombre}</td>
          <td>$${p.precio.toFixed(2)}</td>
          <td>${p.stock}</td>
          <td>${p.categoria}</td>
          <td>
            <button class="editar" data-id="${p.id}">Editar</button>
            <button class="eliminar" data-id="${p.id}">Eliminar</button>
          </td>
        `;
        tabla.appendChild(tr);
      });

      tabla.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', e => {
          localStorage.setItem('editarProductoId', e.target.dataset.id);
          window.location.href = 'productoseditar.html';
        });
      });

      tabla.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', e => {
          eliminarProducto(parseInt(e.target.dataset.id));
          renderizar();
        });
      });
    }
    renderizar();
  }
});
