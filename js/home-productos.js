document.addEventListener('DOMContentLoaded', function mostrarDestacados() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const grid = document.getElementById('productos-destacados');
    const cartCount = document.getElementById('cart-count');
    let count = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCount.textContent = count;

    grid.innerHTML = '';

    // Mostrar solo los primeros 4 productos como destacados
    productos.slice(0, 4).forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Toda la carta clickeable
        card.addEventListener('click', () => {
            localStorage.setItem('detalleProductoId', producto.id);
            window.location.href = 'pages/detalle-producto.html';
        });

        card.innerHTML = `
            <img src="${producto.imagen || 'assets/img/default.jpg'}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toFixed(2)}</p>
                <button class="btn-add" type="button">Añadir al carrito</button>
            </div>
        `;

        const btnAdd = card.querySelector('.btn-add');
        btnAdd.addEventListener('click', (e) => {
            e.stopPropagation();
            count++;
            cartCount.textContent = count;
            localStorage.setItem('cartCount', count);

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            btnAdd.textContent = '✓ Añadido';
            btnAdd.style.background = '#4CAF50';
            setTimeout(() => {
                btnAdd.textContent = 'Añadir al carrito';
                btnAdd.style.background = '';
            }, 1500);
        });

        grid.appendChild(card);
    });
});
