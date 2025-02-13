//Vista del Carrito de compras

document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.querySelector(".close-cart");
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");
    const emptyCartButton = document.createElement("button");
    emptyCartButton.textContent = "Vaciar Carrito";
    emptyCartButton.classList.add("btn", "btn-danger", "w-100", "mt-2");
    
    let cart = [];

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button class="btn btn-sm btn-primary" onclick="changeQuantity(${index}, 1)">+</button>
                <button class="btn btn-sm btn-warning" onclick="changeQuantity(${index}, -1)">-</button>
                <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">X</button>
            `;
            cartItemsList.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = `$${total.toFixed(2)}`;
        if (cart.length > 0) {
            cartItemsList.appendChild(emptyCartButton);
        }
    }

    function changeQuantity(index, amount) {
        cart[index].quantity += amount;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCart();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    emptyCartButton.addEventListener("click", function () {
        cart = [];
        updateCart();
    });

    cartButton.addEventListener("click", function (event) {
        event.preventDefault();
        cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
    });

    closeCart.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    const productDetails = {
        "producto 1": { name: "Cerveza Poker", price: 7000, description: "Descripción detallada del Producto 1", imageUrl: "img/poker330.png", stock: 5 },
        "producto 2": { name: "Cerveza Poker Mediana", price: 8000, description: "Descripción detallada del Producto 2", imageUrl: "img/poker750.png", stock: 15 },
        "producto 3": { name: "Cerveza Poker Mini", price: 6500, description: "Descripción detallada del Producto 3", imageUrl: "img/poker330.png", stock: 20 },
        "producto 4": { name: "Cerveza Poker Grande", price: 7000, description: "Descripción detallada del Producto 4", imageUrl: "img/poker750.png", stock: 57 },
        "producto 5": { name: "Cerveza Poker Premium", price: 9000, description: "Descripción detallada del Producto 5", imageUrl: "img/poker330.png", stock: 3 },
        "producto 6": { name: "Cerveza Poker Light", price: 8500, description: "Descripción detallada del Producto 6", imageUrl: "img/poker750.png", stock: 19 }
    };

    window.addToCart = function (key, event) {
    event.preventDefault(); 
    console.log("Intentando agregar:", key); // Depuración

    let product = productDetails[key];

    if (!product) {
        console.error("Producto no encontrado:", key);
        console.log("Las claves disponibles son:", Object.keys(productDetails));
        return;
    }

    let existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: product.name, price: product.price, quantity: 1 });
    }

    updateCart(); 
};


});