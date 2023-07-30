const availableProducts = [
  { name: "dress", title: "Vestido Cuadrillé Grey", price: 5000, img: "vestidocuadrille.webp" },
  { name: "shirt", title: "Camisa Butterfly", price: 2000, img: "remera-mariposas.jpg" },
  { name: "pants", title: "Pantalón Bordeaux", price: 3000, img: "pantalon-bordeaux.jpg" },
];
const productCart = [];

const validateQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0;
};

const calculateCartTotal = (productCart) => {
  return productCart.reduce((total, item) => total + item.subtotal, 0);
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

const renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (productCart.length > 0) {
    document.getElementById("cart-empty").style.display = "none";
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
            <h2>Subtotal: $${item.subtotal}</h2>
          </div>
        </div>`;
    cartItems.appendChild(cartItem);
  });

  const total = calculateCartTotal(productCart);
  const cartTotal = document.getElementById("cart-total");
  cartTotal.innerHTML = total;
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

  renderCart();
};

const renderProducts = () => {
  const productsSection = document.getElementById("products");

  availableProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12 ";

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

window.onload = () => {
  // console.log("The page has been loaded");
  renderProducts();
};
