const availableProducts = [
  { name: "dress", title: "Dress Grey Square ", price: 5000, img: "vestidocuadrille.webp" },
  { name: "shirt", title: "Shirt Butterfly", price: 2000, img: "remera-mariposas.jpg" },
  { name: "pants", title: "Pant Bordeaux", price: 3000, img: "pantalon-bordeaux.jpg" },
];
let productCart = [];

const validateQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0;
};

const calculateCartTotal = () => {
  return productCart.reduce((total, item) => total + item.subtotal, 0);
};

const calculateCartCount = () => {
  return productCart.reduce((count, item) => count + item.quantity, 0);
};

const findProductByName = (productName) => {
  return availableProducts.find((product) => product.name.toLowerCase() === productName.toLowerCase());
};

const addToCart = (product, quantity) => {
  const existingProduct = productCart.find((item) => item.product.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += quantity;
    existingProduct.subtotal = product.price * existingProduct.quantity;
  } else {
    const subtotal = product.price * quantity;
    productCart.push({ product, quantity, subtotal });
  }
  return productCart;
};

const removeFromCart = (productName) => {
  const product = findProductByName(productName);
  productCart = productCart.filter((item) => item.product.name !== product.name);

  saveCart();
  renderCart();
};

const renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  const finishPurchaseButton = document.getElementById("finish-purchase");
  const totalContainer = document.getElementById("total-container");

  if (productCart.length > 0) {
    document.getElementById("cart-empty").style.display = "none";
    finishPurchaseButton.style.display = "flex";
    totalContainer.style.display = "flex";
  } else {
    document.getElementById("cart-empty").style.display = "flex";
    finishPurchaseButton.style.display = "none";
    totalContainer.style.display = "none";
  }

  productCart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-container";

    cartItem.innerHTML = `<div class="image-cart">
          <img src="/assets/products/${item.product.img}" alt="" />
        </div>
        <div class="products-container">
          <div>
            <h2>${item.product.title}</h2>
          </div>
          <div>
            <h2>Quantity: ${item.quantity}</h2>
          </div>
          <div>
            <h2>Price: $${item.product.price}</h2>
          </div>
          <div>
            <h2>Subtotal: $${item.subtotal}</h2>
          </div>
          <div><button onclick="removeFromCart('${item.product.name}')" class="btn btn-success">Remove</button></div>
        </div>`;
    cartItems.appendChild(cartItem);
  });

  const total = calculateCartTotal(productCart);
  const cartTotal = document.getElementById("cart-total");
  cartTotal.innerHTML = total;

  const count = calculateCartCount(productCart);
  const cartCount = document.getElementById("cart-count");
  cartCount.innerHTML = count;
};

const saveCart = () => {
  const cartString = JSON.stringify(productCart);
  localStorage.setItem("cart", cartString);
};

const loadCart = () => {
  const cartString = localStorage.getItem("cart") || "[]";
  productCart = JSON.parse(cartString);

  const finishPurchaseButton = document.getElementById("finish-purchase");
  const totalContainer = document.getElementById("total-container");

  if (productCart.length <= 0) {
    finishPurchaseButton.style.display = "none";
    totalContainer.style.display = "none";
  } else if (productCart.length > 0) {
    finishPurchaseButton.style.display = "flex";
    totalContainer.style.display = "flex";
  }
};

const buyProduct = (productName) => {
  const product = findProductByName(productName);

  const quantityInput = document.getElementById(`${product.name}-quantity`);
  const quantity = parseInt(quantityInput.value);

  if (!validateQuantity(quantity)) {
    alert("Please enter a valid quantity");
    return;
  }

  addToCart(product, quantity);
  saveCart();
  renderCart();

  quantityInput.value = "0";
};

const renderProducts = () => {
  const productsSection = document.getElementById("products");

  availableProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12";

    card.innerHTML = `<div class="card">
        <img src="/assets/products/${product.img}" class="card-img-top" alt="shirt" />
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <h5 class="card-title">$${product.price}</h5>
          <div class="input-group mb-3">
            <label class="input-group-text">
              Quantity
            </label>
            <input id="${product.name}-quantity" type="number" min="0" class="form-control" placeholder="0" />
          </div>
          <button onclick="buyProduct('${product.name}')" class="btn btn-success">
            Add to cart
          </button>
        </div>
      </div>`;
    productsSection.appendChild(card);
  });
};

const finishPurchase = () => {
  productCart = [];
  saveCart();
  renderCart();
};

window.onload = () => {
  // console.log("The page has been loaded");
  renderProducts();
  loadCart();
  renderCart();
};
