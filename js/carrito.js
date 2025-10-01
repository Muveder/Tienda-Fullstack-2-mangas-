// js/carrito.js

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCartCount();
}

// Actualizar contador en header
function actualizarCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;
    const totalItems = carrito.reduce((sum, item) => sum + (Number(item.cantidad) || 0), 0);
    cartCount.textContent = totalItems;
}

// Añadir producto al carrito
function addToCart(producto, cantidad = 1) {
    cantidad = Number(cantidad) || 1;
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad = Number(existente.cantidad) + cantidad;
    } else {
        carrito.push({ 
            id: producto.id,
            nombre: producto.nombre,
            precio: Number(producto.precio) || 0,
            imagen: producto.imagen || 'assets/img/default.jpg',
            cantidad
        });
    }

    guardarCarrito();
    alert(`Producto "${producto.nombre}" añadido al carrito ✅`);
}

// Mostrar carrito en carrito.html
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-contenedor");
    const totalElem = document.getElementById("carrito-total");

    if (!contenedor || !totalElem) return;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
        totalElem.textContent = "$0.00";
        return;
    }

    carrito.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("carrito-item");

        row.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-img">
            <div class="carrito-info">
                <h4>${item.nombre}</h4>
                <p>Precio: $${Number(item.precio).toFixed(2)}</p>
                <p>Cantidad: 
                    <input type="number" min="1" value="${Number(item.cantidad)}" data-index="${index}" class="cantidad-input">
                </p>
                <button class="eliminar-btn" data-index="${index}">Eliminar</button>
            </div>
        `;

        contenedor.appendChild(row);
    });

    // Cambiar cantidad
    contenedor.querySelectorAll(".cantidad-input").forEach(input => {
        input.addEventListener("change", e => {
            const index = e.target.dataset.index;
            const nuevaCantidad = Number(e.target.value);
            carrito[index].cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
            guardarCarrito();
            mostrarCarrito();
        });
    });

    // Eliminar producto
    contenedor.querySelectorAll(".eliminar-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            guardarCarrito();
            mostrarCarrito();
        });
    });

    // Calcular total seguro
    const total = carrito.reduce((sum, item) => {
        const precio = Number(item.precio) || 0;
        const cantidad = Number(item.cantidad) || 1;
        return sum + precio * cantidad;
    }, 0);

    totalElem.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    actualizarCartCount();
});
