document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos-destacados");
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos destacados por el momento.</p>";
    return;
  }

  // Mostrar máximo 8 productos
  productos.slice(0, 8).forEach(prod => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-content">
        <img src="${prod.imagen || 'assets/img/default.jpg'}" alt="${prod.nombre}" class="product-img">
        <h3 class="title">${prod.nombre}</h3>
        <p class="attr">Precio</p>
        <p class="price">$${prod.precio.toLocaleString("es-CL")}</p>
      </div>
    `;

    contenedor.appendChild(card);
  });
});
