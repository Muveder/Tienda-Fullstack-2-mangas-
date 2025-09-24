function mostrarDetalleProducto() {
  document.addEventListener('DOMContentLoaded', () => {
    const idDetalle = parseInt(localStorage.getItem('detalleProductoId'));
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.id === idDetalle);

    if (!producto) {
      alert('Producto no encontrado');
      window.location.href = 'productos.html';
      return;
    }

    // Mostrar información del producto
    document.getElementById('detalle-img').src = producto.imagen || '../assets/img/default.jpg';
    document.getElementById('detalle-nombre').textContent = producto.nombre;
    document.getElementById('detalle-precio').textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById('detalle-descripcion').textContent = producto.descripcion || 'Sin descripción';

    // Funcionalidad del carrito
    const cartCount = document.getElementById('cart-count');
    let count = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCount.textContent = count;

    document.getElementById('btn-add-carrito').addEventListener('click', () => {
      count++;
      cartCount.textContent = count;
      localStorage.setItem('cartCount', count);

      // Guardar producto en carrito
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      // Feedback visual
      const btn = document.getElementById('btn-add-carrito');
      const originalText = btn.textContent;
      btn.textContent = '✓ Añadido';
      btn.style.background = '#4CAF50';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 1500);
    });
  });
}

// Ejecutar la función
mostrarDetalleProducto();
