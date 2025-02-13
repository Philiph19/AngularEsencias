// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los botones con la clase 'show-details-btn'
    const buttons = document.querySelectorAll(".show-details-btn");
  
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-product"); // Obtiene el ID del producto
        showDetails(productId); // Llama a la función para mostrar detalles
      });
    });
  });
  
  // Almacena los productos en el carrito
  const cart = []; // Arreglo para agregar productos únicos
  
  // Definir productos globalmente para que `addToCart()` pueda acceder
  const productDetails = {
          "producto 1": { name: "Cerveza Poker", price: 7000, description: "Descripción detallada del Producto 1", imageUrl: "img/poker330.png", stock: 5 },
          "producto 2": { name: "Cerveza Poker Mediana", price: 8000, description: "Descripción detallada del Producto 2", imageUrl: "img/poker750.png", stock: 15 },
          "producto 3": { name: "Cerveza Poker Mini", price: 6500, description: "Descripción detallada del Producto 3", imageUrl: "img/poker330.png", stock: 20 },
          "producto 4": { name: "Cerveza Poker Grande", price: 7000, description: "Descripción detallada del Producto 4", imageUrl: "img/poker750.png", stock: 57 },
          "producto 5": { name: "Cerveza Poker Premium", price: 9000, description: "Descripción detallada del Producto 5", imageUrl: "img/poker330.png", stock: 3 },
          "producto 6": { name: "Cerveza Poker Light", price: 8500, description: "Descripción detallada del Producto 6", imageUrl: "img/poker750.png", stock: 19 }
      };
  
  // Función para mostrar detalles del producto
  function showDetails(productId) {
    const product = productDetails[productId];
  
    if (!product) {
      console.error("Producto no encontrado");
      return;
    }
  
    // Insertar detalles en el modal
    const modalBody = document.querySelector(".modal .modal-content .modal-body");
    modalBody.innerHTML = `
      <div class="zoom-container">
        <img src="${product.imageUrl}" alt="${product.name}" class="product-image zoom-in">
      </div>
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="product-price">${product.price}</p>
        <p class="product-stock">Stock: ${product.stock} unidades</p>
        <label for="quantity">Cantidad:</label>
        <input type="number" id="quantity" name="quantity" min="1" max="${product.stock}" value="1" class="quantity-input">
        <button class="add-to-cart-btn" data-product="${productId}" onclick="addToCart('${productId}', event)">Agregar al carrito</button>
      </div>
    `;
  
    // Mostrar el modal
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";
  }
  
  // Función para cerrar el modal
  function closeModal() {
    document.querySelector(".modal").style.display = "none";
  }
  
  // Función para agregar productos al carrito
  function addToCart(productId, event) {
    event.stopPropagation(); // Evita que se active el clic en el contenedor
  
    const product = productDetails[productId];
    if (!product) {
      console.error("Producto no encontrado");
      return;
    }
  
    // Obtener la cantidad seleccionada
    const quantityInput = document.getElementById("quantity");
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
  
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ id: productId, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity });
    }
  
    updateCartDisplay(); // Asegurar que se actualice después de modificar `cart`
    displayCartItems();
  }
  
  // Actualizar el contador del carrito
  function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
  
    if (!cartCount) {
      console.error("Elemento 'cart-count' no encontrado");
      return;
    }
  
    // Verificar que el carrito tiene productos
    const totalUniqueProducts = cart.length;
  
    // Si hay productos, actualiza el contador; si no, muestra 0
    cartCount.textContent = totalUniqueProducts > 0 ? totalUniqueProducts.toString() : "0";
  }   
  
  
  // Mostrar los productos en el carrito dentro del modal
  function displayCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";
  
    if (cart.length === 0) {
      cartItemsList.innerHTML = "<p>El carrito está vacío</p>";
      return;
    }
  
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("cart-item"); // Clase para el estilo
      li.innerHTML = `
        <div class="cart-product">
          <img src="${item.imageUrl}" alt="${item.name}" class="cart-image">
          <div class="cart-details">
            <p class="cart-name">${item.name}</p>
            <p class="cart-price">${item.price}</p>
            <p class="cart-quantity">Cantidad: ${item.quantity}</p>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Eliminar</button>
          </div>
        </div>
      `;
      cartItemsList.appendChild(li);
    });
  }
  
  // Eliminar producto del carrito
  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
      cart.splice(index, 1);
    }
    updateCartDisplay();
    displayCartItems();
  }
  
  // Vaciar carrito
  function emptyCart() {
    cart.length = 0;
    updateCartDisplay();
    displayCartItems();
  }

  