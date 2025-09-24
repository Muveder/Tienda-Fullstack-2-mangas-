document.addEventListener('DOMContentLoaded', () => {
    // Tomar productos desde localStorage
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Contenedor donde se van a mostrar
    const grid = document.querySelector('.product-grid');
    const cartCount = document.getElementById('cart-count');
    let count = 0;

    // Limpiar contenedor
    grid.innerHTML = '';

    // Generar tarjetas de producto
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${producto.imagen || 'assets/img/default.jpg'}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toFixed(2)}</p>
                <button class="btn-add">Añadir al carrito</button>
            </div>
        `;

        grid.appendChild(card);
    });

    // Funcionalidad del carrito
    grid.querySelectorAll('.btn-add').forEach((button, index) => {
        button.addEventListener('click', () => {
            count++;
            cartCount.textContent = count;

            // Efecto visual
            const originalText = button.textContent;
            button.textContent = '✓ Añadido';
            button.style.background = '#4CAF50';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#732F61';
            }, 1500);
        });
    });
});
