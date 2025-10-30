const contenedor = document.getElementById("contenedor-productos");
const form = document.getElementById("form-agregar");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputImagen = document.getElementById("imagen");

// 🔹 Función para crear y mostrar un producto en el HTML
function mostrarProducto(producto) {
  const div = document.createElement("div");
  div.classList.add("producto");

  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio} MXN</p>
    <button class="eliminar">Eliminar</button>
  `;

  // 🔹 Evento para eliminar el producto del DOM
  div.querySelector(".eliminar").addEventListener("click", () => {
    div.remove();
  });

  contenedor.appendChild(div);
}

// 🔹 Cargar productos desde el JSON
fetch("products.json")
  .then(response => response.json())
  .then(datos => {
    datos.forEach(producto => {
      mostrarProducto(producto); // ← Reutilizamos la función
    });
  })
  .catch(error => console.log("Error al cargar el JSON:", error));

// 🔹 Agregar producto desde el formulario
form.addEventListener("submit", e => {
  e.preventDefault();

  const nuevoProducto = {
    nombre: inputNombre.value,
    precio: inputPrecio.value,
    imagen: inputImagen.value
  };

  mostrarProducto(nuevoProducto);

  // 🔹 Limpiar los campos del formulario
  form.reset();
});
