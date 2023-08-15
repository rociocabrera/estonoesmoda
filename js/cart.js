let productCart = [];

const toggleCartButtons = () => {
  if (productCart.length > 0) {
    cartEmpty.style.display = "none";
    finishPurchaseButton.style.display = "flex";
    totalContainer.style.display = "flex";
    removeItemsButton.style.display = "flex";
  } else {
    cartEmpty.style.display = "flex";
    finishPurchaseButton.style.display = "none";
    totalContainer.style.display = "none";
    removeItemsButton.style.display = "none";
  }
};

const addToCart = (product, quantity) => {
  const existingProduct = productCart.find((item) => item.product.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
    existingProduct.subtotal = product.price * existingProduct.quantity;
  } else {
    const subtotal = product.price * quantity;
    productCart.push({ product, quantity, subtotal });
  }
  return productCart;
};

const removeFromCart = (productId) => {
  const product = findProductById(productId);
  productCart = productCart.filter((item) => item.product.id !== product.id);
  saveCart();
  renderCart();
};

const clearCart = () => {
  productCart = [];
  saveCart();
  renderCart();
};

const renderCart = () => {
  const count = calculateCartCount(productCart);
  cartCount.innerHTML = count;

  toggleCartButtons();

  cartItems.innerHTML = "";
  productCart.forEach(({ product, quantity, subtotal }) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-container";

    const { id, img, title, price } = product;

    cartItem.innerHTML = `<div class="image-cart">
          <img src="assets/products/${img}" alt="" />
        </div>
        <div class="products-container">
          <div>
            <h2>${title}</h2>
          </div>
          <div>
            <h2>Quantity: ${quantity}</h2>
          </div>
          <div>
            <h2>Price: $${price}</h2>
          </div>
          <div>
            <h2>Subtotal: $${subtotal}</h2>
          </div>
          <div><button onclick="showRemoveConfirmation('${id}')" class="btn btn-success">Remove</button></div>
        </div>`;
    cartItems.appendChild(cartItem);
  });

  const total = calculateCartTotal(productCart);
  cartTotal.innerHTML = total;
};

const saveCart = () => {
  const cartString = JSON.stringify(productCart);
  localStorage.setItem("cart", cartString);
};

const loadCart = () => {
  const cartString = localStorage.getItem("cart") || "[]";
  productCart = JSON.parse(cartString);
  toggleCartButtons();
};

const finishPurchase = () => {
  clearCart();
  showPurchaseSuccess();
};
